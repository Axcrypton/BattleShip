import Ship from "./Ship.js";

// Handles everything displayed on the screen.
// Connects the game logic to the HTML interface.
export default class UI {
    constructor(game) {

        this.game = game;

        this.playerBoard = document.querySelector("#player-board");
        this.computerBoard = document.querySelector("#computer-board");
        this.status = document.querySelector("#status");

        this.shipsToPlace = [5, 4, 3, 3, 2];
        this.direction = "horizontal";

        this.rotateButton = document.querySelector("#rotate-btn");

        this.rotateButton.addEventListener("click", () => {
            this.direction =
                this.direction === "horizontal"
                    ? "vertical"
                    : "horizontal";

            this.render();
        });
    }

    // Updates the UI to use a new Game instance.
    setGame(game) {
        this.game = game;
    }

    // Resets the UI state when starting a new game.
    reset() {
        this.shipsToPlace = [5, 4, 3, 3, 2];
        this.direction = "horizontal";
    }

    // Redraws both boards and updates the game status.
    render() {

        this.renderBoard(
            this.playerBoard,
            this.game.player1.gameboard,
            true
        );

        this.renderBoard(
            this.computerBoard,
            this.game.player2.gameboard,
            false
        );

        if (this.game.isOver()) {

            this.status.textContent =
                this.game.getWinner() === this.game.player1
                    ? "🎉 You Win!"
                    : "🤖 Computer Wins!";

        }
        else if (this.shipsToPlace.length > 0) {

            this.status.textContent =
                `Place ship (${this.shipsToPlace[0]}) - ${this.direction}`;

        }
        else {

            this.status.textContent =
                this.game.currentPlayer === this.game.player1
                    ? "Your turn — attack the enemy waters!"
                    : "Computer is thinking...";

        }

        if (this.shipsToPlace.length === 0) {
            this.rotateButton.disabled = true;
        }
        else {
            this.rotateButton.disabled = false;
        }

        this.rotateButton.disabled = this.shipsToPlace.length === 0;
    }

    // Displays ships on the player's board.
    drawShip(cell, showShips, hasShip) {

        if (showShips && hasShip) {
            cell.classList.add("ship");
        }

    }

    // Displays a missed attack.
    drawMiss(cell, wasMissed) {

        if (wasMissed) {
            cell.classList.add("miss");
        }

    }

    // Displays a successful hit.
    drawHit(cell, wasHit) {

        if (wasHit) {
            cell.classList.add("hit");
        }

    }

    // Creates every cell of a gameboard and attaches
    // the necessary event listeners.
    renderBoard(boardElement, gameboard, showShips) {

        boardElement.innerHTML = "";

        for (let y = 0; y < 10; y++) {

            for (let x = 0; x < 10; x++) {

                const cell = document.createElement("div");
                cell.classList.add("cell");

                cell.dataset.x = x;
                cell.dataset.y = y;

                const hasShip = gameboard.ships.some(shipData =>
                    shipData.coordinates.some(([sx, sy]) =>
                        sx === x && sy === y
                    )
                );

                const wasMissed = gameboard.missedAttacks.some(
                    ([mx, my]) => mx === x && my === y
                );

                const wasHit =
                    gameboard.attackedCoordinates.has(`${x},${y}`) &&
                    hasShip;

                this.drawShip(cell, showShips, hasShip);
                this.drawMiss(cell, wasMissed);
                this.drawHit(cell, wasHit);

                if (showShips && this.shipsToPlace.length > 0) {

                    cell.addEventListener("click", () => {
                        this.handlePlacement(x, y);
                    });

                }

                if (!showShips && this.shipsToPlace.length === 0) {

                    cell.addEventListener("click", () => {
                        this.handleAttack(x, y);
                    });

                }

                boardElement.appendChild(cell);
            }
        }
    }

    // Places one ship during the setup phase.
    handlePlacement(x, y) {

        const shipLength = this.shipsToPlace[0];

        const valid =
            this.game.player1.gameboard.canPlaceShip(
                new Ship(shipLength),
                x,
                y,
                this.direction
            );


        if (!valid) {
            return;
        }

        this.shipsToPlace.shift();

        this.game.placeShip(
            new Ship(shipLength),
            x,
            y,
            this.direction
        );

        if (this.shipsToPlace.length === 0) {
            this.game.player2.placeShips();
        }

        this.render();
    }

    // Handles player attacks during the battle phase.
    handleAttack(x, y) {

        if (this.game.isOver()) {
            return;
        }

        if (this.game.currentPlayer !== this.game.player1) {
            return;
        }

        try {

            this.game.attack(x, y);
            this.render();

            if (
                !this.game.isOver() &&
                this.game.currentPlayer === this.game.player2
            ) {
                this.handleComputerTurn();
            }

        } catch (error) {

        }
    }

    //Handles the computer's turn after the player attacks.
    handleComputerTurn() {

        const [x, y] = this.game.player2.chooseMove();

        this.game.attack(x, y);

        this.render();

    }
}