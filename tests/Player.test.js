<<<<<<< HEAD
const Player = require("../src/Player");
const Gameboard = require("../src/Gameboard");

describe ("Player", () => {
    test("A newly created player owns a gameboard", () => {
        const player = new Player();

        expect(player.gameboard).toBeInstanceOf(Gameboard)
    });

    test("A player attaking another player's gameboard", () => {
        const player1 = new Player();
        const player2 = new Player();

        player1.attack(player2, 0, 0);
        expect(player2.gameboard.missedAttacks).toEqual([[0, 0]])
    });
=======
const Player = require("../src/Player");
const Gameboard = require("../src/Gameboard");

describe ("Player", () => {
    test("A newly created player owns a gameboard", () => {
        const player = new Player();

        expect(player.gameboard).toBeInstanceOf(Gameboard)
    });

    test("A player attaking another player's gameboard", () => {
        const player1 = new Player();
        const player2 = new Player();

        player1.attack(player2, 0, 0);
        expect(player2.gameboard.missedAttacks).toEqual([[0, 0]])
    });
>>>>>>> bd70cad03ba507a744c7c46699c5de6de9978d98
});