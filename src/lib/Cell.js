const CellValue = Object.freeze({
	MINE: -1,
	EMPTY: 0,
	ONE: 1,
	TWO: 2,
	THREE: 3,
	FOUR: 4,
	FIVE: 5,
	SIX: 6,
	SEVEN: 7,
	EIGHT: 8
});

class Cell {
	constructor(value, isRevealed, isFlagged) {
		this.value = value;
		this.isRevealed = isRevealed;
		this.isFlagged = isFlagged;
	}

	get isEmpty() {
		return this.value === 0;
	}

	get isMine() {
		return this.value === -1;
	}
}

export default Cell;
export { CellValue };