import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HLabel implements IHEl {
  element: HTMLLabelElement;
  public constructor(text: string) {
    var label = document.createElement("label");
    label.innerText = text;
    this.element = label;
  }
  public GetElement(): HTMLLabelElement {
    return this.element;
  }
}
