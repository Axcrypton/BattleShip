const Player = require("../src/Player");
const ComputerPlayer = require("../src/ComputerPlayer");

describe("ComputerPlayer", () => {
    test("ComputerPlayer is Player", () => {
        const computerPlayer = new ComputerPlayer();

        expect(computerPlayer).toBeInstanceOf(Player);
    });

    test("Computer remembers previous moves", () => {
        const computerPlayer = new ComputerPlayer();

        expect(computerPlayer.previousMoves).toEqual(new Set());
    });

    test("ComputerPlayer chooses a coordinate", () => {
        const computerPlayer = new ComputerPlayer();

        const move = computerPlayer.chooseMove();

        expect(move.length).toBe(2);
    });

    test("ComputerPlayer chooses a coordinate within the board", () => {
        const computerPlayer = new ComputerPlayer();

        const [x, y] = computerPlayer.chooseMove();

        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(10);

        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThan(10);
    });

    test("ComputerPlayer never chooses the same move twice", () => {
        const computerPlayer = new ComputerPlayer();

        const firstMove = computerPlayer.chooseMove();
        const secondMove = computerPlayer.chooseMove();

        expect(secondMove).not.toEqual(firstMove);
    });
});