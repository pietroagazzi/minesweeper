import Game from "../../lib/Game";
import { CellValue } from "../../lib/Cell";

describe("Game", () => {
	it("createBoard", () => {
		const board = Game.createBoard(3, 3);

		expect(board).toHaveLength(3);
		expect(board[0]).toHaveLength(3);
		expect(board[1]).toHaveLength(3);
		expect(board[2]).toHaveLength(3);
	});

	it("createBoard with negative width", () => {
		const board = Game.createBoard(-1, 3);

		expect(board).toHaveLength(3);
		expect(board[0]).toHaveLength(0);
		expect(board[1]).toHaveLength(0);
	});

	it("placeMines", () => {
		let board = Game.createBoard(3, 3);
		board = Game.placeMines(board, 3);

		let mines = 0;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[0].length; j++) {
				if (board[i][j].isMine) {
					mines++;
				}
			}
		}

		expect(mines).toBe(3);
	});

	it("placeMines with negative mines", () => {
		let board = Game.createBoard(3, 3);
		board = Game.placeMines(board, -1);

		let mines = 0;

		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board[0].length; j++) {
				if (board[i][j].isMine) {
					mines++;
				}
			}
		}

		expect(mines).toBe(0);
	});

	it("placeMines with too many mines", () => {
		let board = Game.createBoard(3, 3);
		expect(() => {
			Game.placeMines(board, 10);
		}).toThrow("There are not enough cells to place the requested number of mines.");
	});

	it("setAdjacentCellValues", () => {
		let board = Game.createBoard(3, 3);

		/**
		 * Place mines at the following locations:
		 *  M 2 1
		 *  2 M 2
		 *  1 2 M
		 */
		board[0][0].value = CellValue.MINE;
		board[2][2].value = CellValue.MINE;
		board[1][1].value = CellValue.MINE;

		board = Game.setAdjacentCellValues(board);

		expect(board[0][0].value).toBe(CellValue.MINE);
		expect(board[0][1].value).toBe(2);
		expect(board[0][2].value).toBe(1);
		expect(board[1][0].value).toBe(2);
		expect(board[1][1].value).toBe(CellValue.MINE);
		expect(board[1][2].value).toBe(2);
		expect(board[2][0].value).toBe(1);
		expect(board[2][1].value).toBe(2);
		expect(board[2][2].value).toBe(CellValue.MINE);
	});

	it("getAdjacentCells", () => {
		let board = Game.createBoard(3, 3);
		board = Game.placeMines(board, 3);
		board = Game.setAdjacentCellValues(board);

		const adjacentCells = Game.getAdjacentCells(board, 1, 1);

		expect(adjacentCells).toHaveLength(8);
	});
});