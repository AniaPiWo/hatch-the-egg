import { Egg, EggState } from "./egg.js";

interface GameParams {
  eggElement: HTMLImageElement | null;
  counterElement: HTMLParagraphElement | null;
  resultElement: HTMLParagraphElement | null;
}

interface GameInterface extends GameParams {}

export class Game implements GameInterface {
  eggElement: HTMLImageElement | null = null;
  counterElement: HTMLParagraphElement | null = null;
  resultElement: HTMLParagraphElement | null = null;
  stopWatch: number | null = null;
  secondsPassed: number = 0;
  eggInstance: Egg = new Egg({
    clicksToHatch: 30,
    onEggHatch: this.hatchEgg.bind(this),
  });

  init(params: GameParams) {
    if (!params.counterElement || !params.eggElement) {
      throw new Error("One of elements is missing");
    }
    this.counterElement = params.counterElement;
    this.eggElement = params.eggElement;
    this.resultElement = params.resultElement;
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

  updateEggClick() {
    this.eggInstance.tapEgg();
    this.displayEggClicks();
    switch (this.eggInstance.eggClicks) {
      case 1:
        this.startStopWatch();
        break;
    }
  }

  mountEgg() {
    if (!this.eggElement) {
      throw new Error("Egg not found");
    }
    const eggImgSrc = this.eggInstance.assets.get(EggState.Egg);

    if (!eggImgSrc) {
      throw new Error("Egg image not found");
    }
    this.eggElement.src = eggImgSrc;
    this.eggElement.addEventListener("click", this.updateEggClick.bind(this));
  }

  hatchEgg() {
    if (!this.eggElement) {
      throw new Error("Tamago not found");
    }
    const eggImgSrc = this.eggInstance.assets.get(EggState.Tamagotchi);

    if (!eggImgSrc) {
      throw new Error("Tamago image not found");
    }
    if (!this.resultElement) {
      throw new Error("Result image not found");
    }
    this.eggElement.src = eggImgSrc;
    this.resultElement.innerText = this.secondsPassed / 1000 + " seconds";
    this.stopStopWatch();
  }
}
