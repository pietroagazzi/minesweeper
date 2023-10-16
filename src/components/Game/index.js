import "./style.css";
import Cell from "../Cell";
import React from "react";
import GameLogic from "../../lib/Game";

class Game extends React.Component {
	constructor(props) {
		super(props);

		const game = new GameLogic(props.width, props.height, props.mines);

		this.state = { game };
	}

	handleCellClick({ x, y }) {
		const game = this.state.game;

		if (game.isGameOver() || game.isGameWon()) {
			return;
		}

		game.revealCell(x, y);

		if (game.isGameOver()) {
			game.revealAllMines();
		}

		this.setState({ game });
	}

	handleCellFlag({ x, y }) {
		const game = this.state.game;

		if (game.isGameOver() || game.isGameWon()) {
			return;
		}

		game.flagCell(x, y);

		this.setState({ game });
	}

	get isGameEnded() {
		return this.state.game.isGameOver() || this.state.game.isGameWon();
	}

	renderBoard() {
		return (
			<>
				<div className={`Game__board ${this.isGameEnded ? "Game__board--disabled" : ""}`}>
					{this.state.game.board.map((row, y) => (
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
			<div className="Game">
				<div className="Game__info">
					<span className="Game__info-flag-count"
						  style={{ display: this.isGameEnded ? "none" : "block" }}>
						<b>{this.state.game.flags}</b> flags left
					</span>
				</div>

				<div
					className="Game__end" style={{ display: this.isGameEnded ? "block" : "none" }}>
					<div className="Game__end--won"
						 style={{ display: this.state.game.isGameWon() ? "block" : "none" }}>
						<h1>You Won!</h1>
					</div>

					<div className="Game__end--lost"
						 style={{ display: this.state.game.isGameOver() ? "block" : "none" }}>
						<h1>Game Over</h1>
					</div>

					<button onClick={() => window.location.reload()}>Play Again</button>
				</div>

				{this.renderBoard()}
			</div>
		);
	}
}

export default Game;