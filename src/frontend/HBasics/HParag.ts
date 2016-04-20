import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HParag implements IHEl {
  element: HTMLParagraphElement;
  child: IHEl;

  public constructor(child: IHEl) {
    this.child = child;
    var d = document.createElement("p");
    d.appendChild(child.GetElement());
    this.element = d;
  }
  public GetElement() {
    return this.element;
  }
}
