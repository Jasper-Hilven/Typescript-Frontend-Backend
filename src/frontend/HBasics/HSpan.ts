import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HSpan implements IHEl {
  element: HTMLSpanElement;
  children: IHEl[];
  public constructor() {
    this.element = document.createElement("span");
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
