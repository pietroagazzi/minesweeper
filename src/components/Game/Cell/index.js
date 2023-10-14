import "./style.css";

export default function Cell({ value, isRevealed, isFlagged, onClick }) {
	let display = null;
	let className = "Cell";

	if (isRevealed) {
		if (value === -1) {
			display = "💣";
			className += " Cell--mine";
		} else if (value === 0) {
			display = null;
			className += " Cell--revealed";
		} else {
			display = value;
			className += " Cell--revealed";
		}
	} else if (isFlagged) {
		display = "🚩";
		className += " Cell--flagged";
	} else {
		display = null;
		className += " Cell--hidden";
	}

	return (
		<button
			className={className}
			onClick={onClick}
		>
			{display}
		</button>
	);
}