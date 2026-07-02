// Represents one player's gameboard.
// Handles ship placement, attacks, and win conditions.
export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.attackedCoordinates = new Set();
    }

    // Checks if a ship can be placed without going out of bounds
    // or overlapping another ship.
    canPlaceShip(ship, x, y, direction) {

        const coordinates = [];

        for (let i = 0; i < ship.length; i++) {

            const newX =
                direction === "horizontal"
                    ? x + i
                    : x;

            const newY =
                direction === "vertical"
                    ? y + i
                    : y;

            if (newX > 9 || newY > 9) {
                return false;
            }

            coordinates.push([newX, newY]);
        }

        for (const existingShip of this.ships) {

            for (const existingCoordinate of existingShip.coordinates) {

                for (const newCoordinate of coordinates) {

                    if (
                        existingCoordinate[0] === newCoordinate[0] &&
                        existingCoordinate[1] === newCoordinate[1]
                    ) {
                        return false;
                    }

                }

            }

        }

        return true;
    }

    // Places a ship on the board after validating the placement.
    placeShip(ship, x, y, direction) {

        if (!this.canPlaceShip(ship, x, y, direction)) {
            throw new Error("Invalid ship placement");
        }

        const coordinates = [];

        for (let i = 0; i < ship.length; i++) {

            if (direction === "horizontal") {
                coordinates.push([x + i, y]);
            }
            else {
                coordinates.push([x, y + i]);
            }

        }

        this.ships.push({
            ship,
            coordinates
        });
    }

    // Processes an attack on the board.
    // Marks hits, misses, and prevents duplicate attacks.
    receiveAttack(x, y) {

        const coordinate = `${x},${y}`;

        if (this.attackedCoordinates.has(coordinate)) {
            throw new Error("Coordinate already attacked");
        }

        this.attackedCoordinates.add(coordinate);

        let hitFound = false;

        for (const shipData of this.ships) {

            for (const [sx, sy] of shipData.coordinates) {

                if (sx === x && sy === y) {

                    shipData.ship.hit();
                    hitFound = true;
                    break;

                }

            }

        }

        if (!hitFound) {
            this.missedAttacks.push([x, y]);
        }

    }
    // Returns true if every ship on the board has been sunk.
    allShipsSunk() {

        if (this.ships.length === 0) {
            return false;
        }

        return this.ships.every(shipData =>
            shipData.ship.isSunk()
        );

    }
}