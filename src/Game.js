import Player from "./Player.js";
import ComputerPlayer from "./ComputerPlayer.js";

// Controls the overall flow of the Battleship game.
// Handles turns, attacks, and determines the winner.
class Game {
    constructor(player1 = new Player(),
        player2 = new Player()
    ) {
        this.player1 = player1;
        this.player2 = player2;

        this.currentPlayer = this.player1;
    }

    // Places a ship on the current player's board.
    placeShip(ship, x, y, direction) {
        this.currentPlayer.gameboard.placeShip(ship, x, y, direction);
    }
    
    // Returns true when both players have placed their ships.
    isReady() {
        return this.player1.gameboard.ships.length > 0 &&
        this.player2.gameboard.ships.length > 0;
    }

    // Switches the active player.
    nextTurn() {
        this.currentPlayer =
        this.currentPlayer === this.player1
            ? this.player2
            : this.player1;
    }

    // Performs one complete turn.
    // Handles the player's attack and the computer's response.
    attack(x, y) {
        if (!this.isReady()) {
            throw new Error("Game is not ready");
        }

        if (this.isOver()) {
            throw new Error("Game is over");
        }

        this.performAttack(x, y);

        if (this.isOver()) return;

        this.nextTurn();

        if (this.currentPlayer instanceof ComputerPlayer) {
        const [cx, cy] = this.currentPlayer.chooseMove();

        this.performAttack(cx, cy);

        if (this.isOver()) {
            return;
        }

        this.nextTurn();
    }
}

    // Applies an attack to the opposing player's gameboard.
    performAttack(x, y) {
        const opponent =
            this.currentPlayer === this.player1
                ? this.player2
                : this.player1;

        opponent.gameboard.receiveAttack(x, y);
    }

    // Checks if either player has lost all ships.
    isOver() {
        return this.player1.gameboard.allShipsSunk() || 
        this.player2.gameboard.allShipsSunk()
    }

    // Returns the winning player once the game ends.
    getWinner() {
            if (this.player1.gameboard.allShipsSunk()) {
            return this.player2;
        }

        if (this.player2.gameboard.allShipsSunk()) {
            return this.player1;
        }

        return null;
    }
    
}

export default Game;