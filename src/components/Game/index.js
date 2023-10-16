import "./style.css";
import Cell from "../Cell";
import React from "react";

class Game extends React.Component {
	constructor(props) {
		super(props);

		/* replace the state with the props setting */
		this.state = {
			width: props.width || 3,
			height: props.height || 3,
			mines: props.mines || 3,
			board: [],
			isGameOver: false,
			isGameWon: false,
			flags: props.mines || 3
		};
	}

	componentDidMount() {
		this.setState({
			board: this.init(
				this.state.width,
				this.state.height,
				this.state.mines
			)
		});
	}

	init(width, height, mines) {
		let board = [];

		for (let i = 0; i < height; i++) {
			const row = [];

			for (let j = 0; j < width; j++) {
				row.push({
					value: 0,
					isRevealed: false,
					isFlagged: false
				});
			}

			board.push(row);
		}

		board = this.placeMines({ board, width, height, mines });

		return this.setAdjacentCellValues({ board, width, height });
	}

	placeMines({ board, width, height, mines }) {
		const boardCopy = board.slice();
		let minesPlaced = 0;

		while (minesPlaced < mines) {
			const x = Math.floor(Math.random() * width);
			const y = Math.floor(Math.random() * height);

			if (boardCopy[y][x].value !== -1) {
				boardCopy[y][x].value = -1;
				minesPlaced++;
			}
		}

		return boardCopy;
	}

	/**
	 * @returns {array<{value: number, isRevealed: boolean, isFlagged: boolean, x: number, y: number}>}
	 */
	getAdjacentCells({ board, x, y }) {
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

	setAdjacentCellValues({ board, width, height }) {
		const boardCopy = board.slice();

		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				const cell = boardCopy[i][j];

				if (cell.value === -1) {
					continue;
				}

				const adjacentCells = this.getAdjacentCells({ board: boardCopy, x: j, y: i });
				const adjacentMines = adjacentCells.filter(cell => cell.value === -1);

				cell.value = adjacentMines.length;
			}
		}

		return boardCopy;
	}

	revealAdjacentCells({ board, x, y }) {
		if (!board[y] || !board[y][x]) {
			return board;
		}

		const cell = board[y][x];

		if (cell.isRevealed || cell.isFlagged) {
			return board;
		}

		cell.isRevealed = true;

		if (cell.value !== 0) {
			return board;
		}

		const adjacentCells = this.getAdjacentCells({ board, x, y });

		adjacentCells.forEach(cell => {
			if (!cell.isRevealed) {
				this.revealAdjacentCells({ board, x: cell.x, y: cell.y });
			}
		});

		return board;
	}

	handleCellClick({ x, y }) {
		const cell = this.state.board[y][x];

		if (cell.isRevealed || cell.isFlagged) {
			return;
		}

		if (cell.value === -1) {
			this.gameOver();
			return;
		}

		const board = this.revealAdjacentCells({ board: this.state.board, x, y });

		if (this.isGameWon(board)) {
			this.setState({ isGameWon: true });
		}

		this.setState({ board });
	}

	handleCellFlag({ x, y }) {
		const boardCopy = this.state.board.slice();
		const cell = boardCopy[y][x];

		if (this.state.flags === 0 && !cell.isFlagged) {
			return;
		}

		if (cell.isRevealed) {
			return;
		}

		cell.isFlagged = !cell.isFlagged;

		this.setState({ board: boardCopy, flags: this.state.flags + (cell.isFlagged ? -1 : 1) });
	}

	isGameWon(board) {
		return board.every(row => {
			return row.every(cell => {
				return cell.isRevealed || (cell.isFlagged && cell.value === -1);
			});
		});
	}

	gameOver() {
		this.setState({ isGameOver: true });
		const boardCopy = this.state.board.slice();

		boardCopy.forEach(row => {
			row.forEach(cell => {
				if (cell.value === -1) {
					cell.isRevealed = true;
				}
			});
		});

		this.setState({ board: boardCopy });
	}

	get isGameEnded() {
		return this.state.isGameOver || this.state.isGameWon;
	}

	renderBoard(board) {
		return (
			<>
				<div className={`Game__board ${this.isGameEnded ? "Game__board--disabled" : ""}`}>
					{board.map((row, y) => (
						<div key={y} className="Game__board-row">
							{row.map((cell, x) => (
								<Cell
									key={x}
									value={cell.value}
									isRevealed={cell.isRevealed}
									isFlagged={cell.isFlagged}
									onLeftClick={() => this.handleCellClick({ x, y })}
									onRightClick={e => {
										e.preventDefault();
										this.handleCellFlag({ x, y });
									}}
								/>
							))}
						</div>
					))}
				</div>
			</>
		);
	}

	render() {
		return (
			<>
				<div className="Game__info">
					<span className="Game__info-flag-count"
						  style={{ display: this.isGameEnded ? "none" : "block" }}>
						<b>{this.state.flags}</b> flags left
					</span>
				</div>

				<div
					className={`Game__end ${this.isGameEnded ? "is-visible" : ""}`}>
					<div className={`Game__end-content`} style={{ display: this.state.isGameWon ? "block" : "none" }}>
						<h1>You Won!</h1>
					</div>

					<div className={`Game__end-content`} style={{ display: this.state.isGameOver ? "block" : "none" }}>
						<h1>Game Over</h1>
					</div>

					<button onClick={() => window.location.reload()}>Play Again</button>
				</div>

				{this.renderBoard(this.state.board)}
			</>
		);
	}
}

export default Game;