import { Egg, EggState } from "./egg.js";

interface GameParams {
  eggElement: HTMLImageElement | null;
  counterElement: HTMLParagraphElement | null;
}

interface GameInterface extends GameParams {}

export class Game implements GameInterface {
  eggElement: HTMLImageElement | null = null;
  counterElement: HTMLParagraphElement | null = null;
  stopWatch: number | null = null;
  secondsPassed: number = 0;
  eggInstance: Egg = new Egg();

  init(params: GameParams) {
    if (!params.counterElement || !params.eggElement) {
      throw new Error("One of elements is missing");
    }
    this.counterElement = params.counterElement;
    this.eggElement = params.eggElement;
    this.displayEggClicks();
    this.mountEgg();
    console.log("this -> ", this);
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
      this.secondsPassed++;
      console.log("seconds passed ", this.secondsPassed);
    }, 1000);
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
}
