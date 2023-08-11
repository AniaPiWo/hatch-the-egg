import { Egg, EggState } from "./egg.js";

interface GameParams {
  eggElement: HTMLImageElement | null;
  counterElement: HTMLParagraphElement | null;
}

interface GameInterface extends GameParams {}

export class Game implements GameInterface {
  eggElement: HTMLImageElement | null = null;
  counterElement: HTMLParagraphElement | null = null;
  eggInstance: Egg = new Egg();

  init(params: GameParams) {
    if (!params.counterElement || !params.eggElement) {
      throw new Error("One of elements is missing");
    }
    this.counterElement = params.counterElement;
    this.eggElement = params.eggElement;
    this.displayEggClicks();
    this.displayEgg();
    console.log("this -> ", this);
    console.log("game started");
  }

  displayEggClicks() {
    if (!this.counterElement) {
      throw new Error("Counter not found");
    }
    this.counterElement.innerText = String(this.eggInstance.eggClicks); //bo jest number
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
}