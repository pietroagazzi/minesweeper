import "./style.css";
import React from "react";

const Bomb = () => (
	<svg className="Bomb" width="24" height="24" viewBox="0 0 16 16" fill="currentColor"
		 xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM7 12H9V14H7V12ZM7.8 7.5L6.5 6.2L7.2 5.5L8.5 6.8L9.8 5.5L10.5 6.2L9.2 7.5L10.5 8.8L9.8 9.5L8.5 8.2L7.2 9.5L6.5 8.8L7.8 7.5Z"
		/>
	</svg>
);

const Flag = () => (
	<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30" fill="currentColor">
		<path
			d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
	</svg>
);

class Cell extends React.Component {
	get display() {
		if (this.props.isFlagged) {
			return <Flag />;
		}

		if (this.props.isRevealed) {
			if (this.props.value === -1) {
				return <Bomb />;
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
				return "Cell Cell--mine";
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