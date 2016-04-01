import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HTextSpan implements IHEl {
  element: HTMLSpanElement;
  public constructor(text: string) {
    this.element = document.createElement("span");
    this.element.innerText = text;
  }

  public GetElement() {
    return this.element;
  }
}
