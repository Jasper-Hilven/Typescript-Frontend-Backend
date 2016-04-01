import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HDiv implements IHEl {
  element: HTMLDivElement;
  children: IHEl[];
  public constructor() {
    this.element = document.createElement("div");
    this.children = [];
  }

  public AddElement(hElement) {
    this.children.push(hElement);
    this.element.appendChild(hElement.GetElement());
  }
  public GetElement() {
    return this.element;
  }
}
