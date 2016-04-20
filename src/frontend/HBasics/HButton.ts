/*StartImport*/ /*StopImport*/
import HE = require("./IHElement"); import IHEl = HE.IHElement;

export class HButton implements IHEl {
  element: HTMLButtonElement;
  child: IHEl;
  public constructor(child: IHEl) {
    this.child = child;
    var button = document.createElement("button");
    button.appendChild(child.GetElement());
    this.element = button;
  }

  public GetElement() {
    return this.element;
  }
  public SetAction(action) {
    this.element.onclick = function() { action(); };
  }
}
