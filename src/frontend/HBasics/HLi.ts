import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HLi implements IHEl {
  element: HTMLLIElement;
  child: IHEl;
  // Children: IHEl[];
  public constructor(child: IHEl) {
    this.element = document.createElement("li");
    this.element.appendChild(child.GetElement());
    this.child = child;
  }

  public GetElement() {
    return this.element;
  }
}
