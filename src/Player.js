// Represents a human player.
// Owns a gameboard and can attack another player.
import Gameboard from "./Gameboard.js";

class Player {
    constructor() {
        this.gameboard = new Gameboard();
    }

    // Attacks a coordinate on the opponent's gameboard.
    attack(opponent, x, y) {
        opponent.gameboard.receiveAttack(x, y);
    }
}

export default Player;