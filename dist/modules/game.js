import { Egg, EggState } from "./egg.js";
export class Game {
    constructor() {
        this.eggElement = null;
        this.counterElement = null;
        this.resultElement = null;
        this.actionBtnElement = null;
        this.stopWatch = null;
        this.secondsPassed = 0;
        this.eggInstance = new Egg({
            clicksToHatch: 30,
            onEggHatch: this.hatchEgg.bind(this),
        });
    }
    init(params) {
        if (!params.counterElement || !params.eggElement) {
            throw new Error("One of elements is missing");
        }
        this.counterElement = params.counterElement;
        this.eggElement = params.eggElement;
        this.resultElement = params.resultElement;
        this.actionBtnElement = params.actionBtnElement;
        this.displayEggClicks();
        this.mountEgg();
        console.log("game started");
    }
    displayEggClicks() {
        if (!this.counterElement) {
            throw new Error("Counter not found");
        }
        this.counterElement.innerText = String(this.eggInstance.eggClicks); //bo jest number
    }
    startStopWatch() {
        this.stopWatch = setInterval(() => {
            this.secondsPassed = this.secondsPassed + 100;
        }, 100);
    }
    stopStopWatch() {
        if (!this.stopWatch) {
            throw new Error("Stopwatch not found");
        }
        clearInterval(this.stopWatch);
    }
    showResetButton() {
        if (!this.actionBtnElement) {
            throw new Error("Reset button not found");
        }
        this.actionBtnElement.innerText = "Restart";
        this.actionBtnElement.classList.remove("hidden");
        this.actionBtnElement.addEventListener("click", this.restartGame.bind(this));
    }
    hideResetButton() {
        if (!this.actionBtnElement) {
            throw new Error("Reset button not found");
        }
        this.actionBtnElement.classList.add("hidden");
        this.actionBtnElement.removeEventListener("click", this.restartGame.bind(this));
    }
    restartGame() {
        this.secondsPassed = 0;
        this.displayResult();
        this.eggInstance.eggClicks = 0;
        this.displayEggClicks();
        this.displayEgg();
        this.hideResetButton();
    }
    updateEggClick() {
        this.eggInstance.tapEgg();
        this.displayEggClicks();
        switch (this.eggInstance.eggClicks) {
            case 1:
                this.startStopWatch();
                break;
        }
    }
    displayEgg() {
        if (!this.eggElement) {
            throw new Error("Egg not found");
        }
        const eggImgSrc = this.eggInstance.assets.get(EggState.Egg);
        if (!eggImgSrc) {
            throw new Error("Egg image not found");
        }
        this.eggElement.src = eggImgSrc;
    }
    mountEgg() {
        if (!this.eggElement) {
            throw new Error("Egg not found");
        }
        this.displayEgg();
        this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
    }
    displayResult() {
        if (!this.resultElement) {
            throw new Error("Result element not found");
        }
        this.resultElement.innerText = !!this.secondsPassed
            ? (this.secondsPassed / 1000).toString() + " seconds"
            : "";
    }
    hatchEgg() {
        if (!this.eggElement) {
            throw new Error("Tamago not found");
        }
        const eggImgSrc = this.eggInstance.assets.get(EggState.Tamagotchi);
        if (!eggImgSrc) {
            throw new Error("Tamago image not found");
        }
        this.eggElement.src = eggImgSrc;
        this.displayResult();
        this.stopStopWatch();
        this.showResetButton();
    }
}
