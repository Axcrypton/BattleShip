import Player from "./Player.js";
import Ship from "./Ship.js";

class ComputerPlayer extends Player {
    constructor() {
        super();
        this.previousMoves = new Set();
    }

    chooseMove() {
        while (true) {
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);

            const coordinate = `${x},${y}`;

            if (!this.previousMoves.has(coordinate)) {
                this.previousMoves.add(coordinate);
                return [x, y];
            }
        }
    }

    placeShips() {
        const shipLengths = [5, 4, 3, 3, 2];

        for (const length of shipLengths) {

            let placed = false;

            while (!placed) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                const direction = 
                    Math.random() < 0.5 
                        ? "horizontal" 
                        : "vertical";
                
                try {

                    this.gameboard.placeShip(
                        new Ship(length),
                        x,
                        y,
                        direction
                    );
                        
                    placed = true;
                } catch (error) {
                        // Try again
                    }
                
            }
        }
    }
}

export default ComputerPlayer;