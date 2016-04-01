import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HDiv implements IHEl {
  element: HTMLDivElement;
  children: IHEl[];
  public constructor() {
    this.element = document.createElement("div");
  }

  public AddElement(hElement) {
    this.element.appendChild(hElement.GetElement());
  }
  public GetElement(): HTMLDivElement {
    return this.element;
  }
}
