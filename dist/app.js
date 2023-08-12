import { Game } from "./modules/game.js";
document.addEventListener("DOMContentLoaded", function () {
    const counter = document.querySelector("#counter");
    const egg = document.querySelector("#egg");
    const result = document.querySelector("#result");
    const actionBtn = document.querySelector("#action-btn");
    const game = new Game();
    game.init({
        actionBtnElement: actionBtn,
        counterElement: counter,
        eggElement: egg,
        resultElement: result,
    });
});
