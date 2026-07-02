const Gameboard = require("../src/Gameboard");
const Ship = require("../src/Ship");

describe("Gameboard", () => {
    test("creates an empty gameboard", () => {
        const board = new Gameboard();

        expect(board.ships).toEqual([]);
        expect(board.missedAttacks).toEqual([]);
    });

    test("places a ship on the board", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 0, 0, "horizontal");

        expect(board.ships.length).toBe(1);
        expect(board.ships[0].ship).toBe(ship);
        expect(board.ships[0].coordinates).toEqual([
            [0, 0],
            [1, 0],
            [2, 0]
        ]);
    });

    test("places a ship horizontally", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 2, 5, "horizontal");
        
        expect(board.ships[0].coordinates).toEqual([
                [2, 5],
                [3, 5],
                [4, 5]
        ]);
    });

    test("places a ship vertically", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 2, 5, "vertical");

        expect(board.ships[0].coordinates).toEqual([
            [2, 5],
            [2, 6],
            [2, 7]
        ])
    });

    test("does not allow ships tp be placed outside the board horizontally", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        expect(() => {
            board.placeShip(ship, 8, 0, "horizontal");
        }).toThrow();
    });

    test("does not allow ships tp be placed outside the board vertically", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        expect(() => {
            board.placeShip(ship, 0, 8, "vertical");
        }).toThrow();
    });

    test("does not allow to overlap ships", () => {
        const board = new Gameboard();

        const ship1 = new Ship(3);
        const ship2 = new Ship(3);

        board.placeShip(ship1, 2, 5, "horizontal");

        expect(() => {
            board.placeShip(ship2, 4, 5, "horizontal");
        }).toThrow();
    });

    test("When an attack lands on a ship, that ship should receive one hit", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 0, 0, "horizontal");

        board.receiveAttack(0,0);
        expect(ship.hits).toBe(1);
    });

    test("Record a missed attack", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 0, 0, "horizontal");
        board.receiveAttack(9,9);
        expect(board.missedAttacks).toEqual([
            [9,9]
        ]);           
    });

    test("Report a ship has sunk", () => {
        const board = new Gameboard();
        const ship = new Ship(3);

        board.placeShip(ship, 0, 0, "horizontal");
        board.receiveAttack(0,0);
        board.receiveAttack(1,0);
        board.receiveAttack(2,0);

        expect(board.allShipsSunk()).toBe(true);
    });

    test("Records a missed attack when no ship is present", () => {
        const gameboard = new Gameboard();

        gameboard.receiveAttack(9, 9);

        expect(gameboard.missedAttacks.length).toBe(1);
    });

    test("cannot attack the same coordinate twice", () => {
    const board = new Gameboard();
    const ship = new Ship(3);

    board.placeShip(ship, 0, 0, "horizontal");

    board.receiveAttack(0, 0);

    expect(() => {
        board.receiveAttack(0, 0);
    }).toThrow("Coordinate already attacked");
    });
});