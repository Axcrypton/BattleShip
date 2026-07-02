const Ship = require("../src/Ship");

describe("Ship", () => {
    test("stores its length", () => {
        const ship = new Ship(3);
        expect(ship.length).toBe(3);
    });

    test("starts with 0 hits", () => {
        const ship = new Ship(3);
        expect(ship.hits).toBe(0);
    });

    test("hit() increases hits", () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test("isSunk() returns false when not enough hits", () => {
        const ship = new Ship(3);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test("isSunk() returns true when ship has enough hits", () => {
        const ship = new Ship(3);

        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    });
});