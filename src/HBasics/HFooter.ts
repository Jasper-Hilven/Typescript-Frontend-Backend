import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HFooter implements IHEl {
  element: HTMLElement;
  child: IHEl;
  //children: IHEl[];
  public constructor(child: IHEl) {
    this.element = document.createElement("footer");
    this.element.appendChild(child.GetElement());
    this.child = child;
  }

  public GetElement() {
    return this.element;
  }
}
