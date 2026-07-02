const Player = require("../src/Player");
const Game = require("../src/Game");
const Ship = require("../src/Ship");
const ComputerPlayer = require("../src/ComputerPlayer");

describe("Game", () => {
    test("Game owns player1 and player2", () => {
        const game = new Game();

        expect(game.player1).toBeInstanceOf(Player);
        expect(game.player2).toBeInstanceOf(Player);
    });

    test("Whose turn is it right now?", () => {
        const game = new Game();

        expect(game.currentPlayer).toBe(game.player1);
    });

    test("Switches back to player1 after player2 turn", () => {
        const game = new Game();

        game.nextTurn();
        game.nextTurn();

        expect(game.currentPlayer).toBe(game.player1);
    });

    test("current player attacks opponent gameboard", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 8, 8, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        game.attack(9, 9);

        const opponentBoard = game.player2.gameboard;

        expect(opponentBoard.missedAttacks.length).toBe(1);
    });

    test("Game is over when player2 has no ships remaining", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        game.attack(0, 0);

        expect(game.isOver()).toBe(true);
    });

    test("game is not ready until both players have ships", () => {
        const game = new Game();

        expect(game.isReady()).toBe(false);

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        expect(game.isReady()).toBe(false);

        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        expect(game.isReady()).toBe(true);
    });

    test("returns player1 as winner when player2's ships are sunk", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        game.attack(0, 0);

        expect(game.getWinner()).toBe(game.player1);
    });

    test("cannot attack after the game is over", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        game.attack(0, 0);

        expect(game.isOver()).toBe(true);

        expect(() => {
            game.attack(5, 5);
        }).toThrow("Game is over");
    });

    test("Game accepts custom player types", () => {
        const player1 = new Player();
        const player2 = new ComputerPlayer();

        const game = new Game(player1, player2);
    
        expect(game.player1).toBe(player1);
        expect(game.player2).toBe(player2);
    });

    test("current player places a ship", () => {
        const game = new Game();
        const ship = new Ship(3);

        game.placeShip(ship, 0, 0, "horizontal");

        expect(game.player1.gameboard.ships.length).toBe(1);
    });

    test("computer automatically attacks after the player", () => {
        const player = new Player();
        const computer = new ComputerPlayer();

        const game = new Game(player, computer);

        game.placeShip(new Ship(1), 0, 0, "horizontal");
        game.nextTurn();
        game.placeShip(new Ship(1), 9, 9, "horizontal");
        game.nextTurn();

        game.attack(5, 5);

        expect(player.gameboard.attackedCoordinates.size).toBe(1);
    });

    test("game starts in placement phase", () => {
        const game = new Game();

        expect(game.phase).toBe("placement");
    });

    test("game enters battle phase when started", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        game.startBattle();

        expect(game.phase).toBe("battle");
    });

    test("player2 places ships after player1", () => {
        const game = new Game();

        game.placeShip(new Ship(1), 0, 0, "horizontal");

        game.nextTurn();

        game.placeShip(new Ship(1), 9, 9, "horizontal");

        expect(game.player1.gameboard.ships.length).toBe(1);
        expect(game.player2.gameboard.ships.length).toBe(1);
    });

    test("cannot attack during placement phase", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        expect(() => {
            game.attack(5, 5);
        }).toThrow("Battle has not started");
    });

    test("player cannot place ships after the battle has started", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        game.startBattle();

        expect(() => {
            game.placeShip(new Ship(1), 5, 5, "horizontal");
        }).toThrow("Cannot place ships after the battle has started");
    });

    test("cannot place ships after battle has started", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        game.startBattle();

        expect(() => {
            game.placeShip(new Ship(1), 5, 5, "horizontal");
        }).toThrow("Cannot place ships after battle has started");
    });

    test("cannot attack during gameOver phase", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        game.startBattle();

        game.attack(0, 0);

        expect(game.phase).toBe("gameOver");

        expect(() => {
            game.attack(5, 5);
        }).toThrow("Game is over");
    });

    test("cannot start battle if players have not finished placing ships", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        expect(() => {
            game.startBattle();
        }).toThrow("Game is not ready");
    });

    test("cannot attack during gameOver phase", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        game.startBattle();

        game.attack(9, 9);

        expect(game.phase).toBe("gameOver");

        expect(() => {
            game.attack(5, 5);
        }).toThrow("Game is over");
    });

    test("cannot start battle if players are not ready", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");

        expect(() => {
            game.startBattle();
        }).toThrow("Game is not ready");
    });

    test("cannot place ships after battle starts", () => {
        const game = new Game();

        game.player1.gameboard.placeShip(new Ship(1), 0, 0, "horizontal");
        game.player2.gameboard.placeShip(new Ship(1), 9, 9, "horizontal");

        game.startBattle();

        expect(() => {
            game.placeShip(new Ship(1), 5, 5, "horizontal");
        }).toThrow("Cannot place ships after battle has started");
    });
});