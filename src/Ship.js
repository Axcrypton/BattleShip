// Represents a single ship in the game.
// Tracks its length and the number of times it has been hit.
export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
    }

    // Registers one hit on the ship.
    hit() {
        this.hits++;
    }

    // Returns true if the ship has taken enough hits to sink.
    isSunk() {
        return this.hits >= this.length;
    }
}