import "./style.css";
import Cell from "./Cell";
import React from "react";

class Game extends React.Component {
	constructor(props) {
		super(props);

		/* replace the state with the props setting */
		this.state = {
			width: props.width || 3,
			height: props.height || 3,
			mines: props.mines || 3,
			board: []
		};
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

	getAdjacentCells({ board, x, y }) {
		const adjacentCells = [];

		for (let i = y - 1; i <= y + 1; i++) {
			for (let j = x - 1; j <= x + 1; j++) {
				if (i === y && j === x) {
					continue;
				}

				if (board[i] && board[i][j]) {
					adjacentCells.push(board[i][j]);
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

	componentDidMount() {
		this.setState({
			board: this.init(
				this.state.width,
				this.state.height,
				this.state.mines
			)
		});
	}

	handleCellClick({ x, y }) {
		const boardCopy = this.state.board.slice();
		const cell = boardCopy[y][x];

		if (cell.isRevealed || cell.isFlagged) {
			return;
		}

		cell.isRevealed = true;

		this.setState({ board: boardCopy });
	}

	handleCellFlag({ x, y }) {
		const boardCopy = this.state.board.slice();
		const cell = boardCopy[y][x];

		if (cell.isRevealed) {
			return;
		}

		cell.isFlagged = !cell.isFlagged;

		this.setState({ board: boardCopy });
	}

	renderBoard(board) {
		return (
			<div className="Game__board">
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
		);
	}

	render() {
		return (
			<div className="Game">
				<div className="Game__board">
					{this.renderBoard(this.state.board)}
				</div>
			</div>
		);
	}
}

export default Game;