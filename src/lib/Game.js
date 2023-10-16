import Cell, { CellValue } from "./Cell";

class Game {
	/** @type {Cell[][]} */
	board = null;
	gameOver = false;

	/**
	 * @param width {number}
	 * @param height {number}
	 * @param mines {number}
	 */
	constructor(width, height, mines) {
		this.width = width;
		this.height = height;
		this.mines = mines;
		this.flags = mines;

		let board = Game.createBoard(width, height);
		board = Game.placeMines(board, mines);
		board = Game.setAdjacentCellValues(board);

		this.board = board;
	}

	/**
	 * Creates a new empty board of the given width and height.
	 * @param width {number}
	 * @param height {number}
	 * @returns {Cell[][]} A 2D array of Cell objects.
	 * @see Cell
	 */
	static createBoard(width, height) {
		/** @type {Cell[][]} */
		const board = [];

		for (let i = 0; i < height; i++) {
			const row = [];

			for (let j = 0; j < width; j++) {
				row.push(new Cell(
					CellValue.EMPTY,
					false,
					false
				));
			}

			board.push(row);
		}

		return board;
	}

	/**
	 * Places mines randomly on the board.
	 * @param board {Cell[][]} The board to place mines on.
	 * @param mines {number} The number of mines to place.
	 * @returns {Cell[][]} The board with mines placed.
	 * @exception Throws an error if there are not enough empty cells to place the requested number of mines.
	 */
	static placeMines(board, mines) {
		let minesPlaced = 0;

		// Check if there are enough free cells for the number of mines requested
		const emptyCells = board.flat().filter(cell => !cell.isMine);

		if (board.length < 1 || emptyCells.length < mines) {
			throw new Error("There are not enough cells to place the requested number of mines.");
		}

		while (minesPlaced < mines) {
			const x = Math.floor(Math.random() * board.length);
			const y = Math.floor(Math.random() * board[0].length);

			if (!board[y][x].isMine) {
				board[y][x].value = CellValue.MINE;
				minesPlaced++;
			}
		}

		return board;
	}

	/**
	 * Sets the value of each cell to the number of mines adjacent to it.
	 * @param board {Cell[][]} The board to set the values of.
	 * @returns {Cell[][]} The board with values set.
	 */
	static setAdjacentCellValues(board) {
		let width = board[0].length;
		let height = board.length;

		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				const cell = board[i][j];

				if (cell.isMine) {
					continue;
				}

				const adjacentCells = this.getAdjacentCells(board, j, i);
				const adjacentMines = adjacentCells.filter(cell => cell.isMine);

				cell.value = adjacentMines.length;
			}
		}

		return board;
	}

	/**
	 * Gets the cells adjacent to the given cell.
	 * @param board {Cell[][]} The board to get the adjacent cells from.
	 * @param x {number} The x coordinate of the cell.
	 * @param y {number} The y coordinate of the cell.
	 * @returns {{value: number, isRevealed: boolean, isFlagged: boolean, x: number, y: number}[]} An array of adjacent cells.
	 */
	static getAdjacentCells(board, x, y) {
		const adjacentCells = [];

		for (let i = y - 1; i <= y + 1; i++) {
			for (let j = x - 1; j <= x + 1; j++) {
				if (i === y && j === x) {
					continue;
				}

				if (board[i] && board[i][j]) {
					const obj = board[i][j];
					obj.x = j;
					obj.y = i;

					adjacentCells.push(obj);
				}
			}
		}

		return adjacentCells;
	}

	revealAllMines() {
		this.board
			.flat()
			.filter(cell => cell.isMine)
			.forEach(cell => {
				cell.isRevealed = true;
			});
	}

	revealCell(x, y) {
		const cell = this.board[y][x];

		if (cell.isRevealed || cell.isFlagged) {
			return;
		}

		if (cell.isMine) {
			this.gameOver = true;
			return;
		}

		this.revealEmptyCells(x, y);
	}

	revealEmptyCells(x, y) {
		if (!this.board[y] || !this.board[y][x]) {
			return;
		}

		const cell = this.board[y][x];

		if (cell.isRevealed || cell.isFlagged) {
			return;
		}

		cell.isRevealed = true;

		if (cell.value !== CellValue.EMPTY) {
			return;
		}

		const adjacentCells = Game.getAdjacentCells(this.board, x, y);

		adjacentCells.forEach(cell => {
			if (!cell.isRevealed) {
				this.revealEmptyCells(cell.x, cell.y);
			}
		});
	}

	flagCell(x, y) {
		const cell = this.board[y][x];

		if (cell.isRevealed) {
			return;
		}

		cell.isFlagged = !cell.isFlagged;

		this.flags += cell.isFlagged ? -1 : 1;
	}

	isGameWon() {
		return this.board
			.flat()
			.filter(cell => !cell.isRevealed).length === this.mines;
	}

	isGameOver() {
		return this.gameOver;
	}
}

export default Game;