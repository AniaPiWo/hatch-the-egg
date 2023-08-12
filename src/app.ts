import { Game } from "./modules/game.js";

document.addEventListener("DOMContentLoaded", function () {
  const counter = document.querySelector(
    "#counter"
  ) as HTMLParagraphElement | null;
  const egg = document.querySelector("#egg") as HTMLImageElement | null;
  const result = document.querySelector(
    "#result"
  ) as HTMLParagraphElement | null;
  const actionBtn = document.querySelector(
    "#action-btn"
  ) as HTMLButtonElement | null;

  const game = new Game();
  game.init({
    actionBtnElement: actionBtn,
    counterElement: counter,
    eggElement: egg,
    resultElement: result,
  });
});
