import "./style.css";

import Game from "./Game.js";
import Player from "./Player.js";
import ComputerPlayer from "./ComputerPlayer.js";
import UI from "./UI.js";

// Entry point of the application.
// Creates the game, builds the interface, and starts gameplay.
document.querySelector("#app").innerHTML = `
    <h1>Battleship</h1>

    <button id="rotate-btn">
        Rotate Ship
    </button>

    <button id="restart-btn">
        Restart Game
    </button>

    <h2 id="status"></h2>

    <div class="boards">
        <div>
            <h3>Fleet</h3>
            <div id="player-board"></div>
        </div>

        <div>
            <h3>Enemy Waters</h3>
            <div id="computer-board"></div>
        </div>
    </div>
`;

let game;
let ui;

// Creates a new game and renders the initial UI.
function startGame() {
    game = new Game(
        new Player(),
        new ComputerPlayer()
    );

    window.game = game;

    ui = new UI(game);

    window.ui = ui;

    ui.render();
}

// Starts a fresh game when the restart button is clicked.
const restartButton = document.querySelector("#restart-btn");

    restartButton.addEventListener("click", () => {
        game = new Game(
            new Player(),
            new ComputerPlayer()
        );

        window.game = game;

        ui.setGame(game);

        ui.reset();
        ui.render();
    });

startGame();