import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HLabel implements IHEl {
  element: HTMLLabelElement;
  child: IHEl;

  public constructor(child: IHEl) {
    this.child = child;
    var label = document.createElement("label");
    label.appendChild(child.GetElement());
    this.element = label;
  }
  public GetElement() {
    return this.element;
  }
}
