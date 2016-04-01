import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HButton implements IHEl {
  element: HTMLButtonElement;
  public constructor(text: string) {

    var button = document.createElement("button");
    button.innerText = text;
    this.element = button;
  }

  public GetElement() {
    return this.element;
  }
}
