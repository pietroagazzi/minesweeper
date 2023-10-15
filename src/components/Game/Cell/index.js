import "./style.css";
import React from "react";

class Cell extends React.Component {
	get display() {
		if (this.props.isFlagged) {
			return "🚩";
		}

		if (this.props.isRevealed) {
			if (this.props.value === -1) {
				return "💣";
			}

			if (this.props.value === 0) {
				return null;
			}

			return this.props.value;
		}

		return null;
	}

	get className() {
		if (this.props.isRevealed) {
			if (this.props.value === -1) {
				return "Cell Cell--bomb";
			}

			return "Cell Cell--revealed";
		}

		if (this.props.isFlagged) {
			return "Cell Cell--flagged";
		}

		return "Cell";
	}

	render() {
		return (
			<button
				className={this.className}
				onClick={this.props.onLeftClick}
				onContextMenu={this.props.onRightClick}
			>
				{this.display}
			</button>
		);
	}
}

export default Cell;