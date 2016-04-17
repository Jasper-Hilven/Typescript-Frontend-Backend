import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HRadioButton implements IHEl {
  element: HTMLInputElement;
  public constructor() {
    this.element = document.createElement("input");
    this.element.setAttribute("type", "radio");
  }

  public IsChecked() {
    return this.element.checked;
  }
  public SetChecked(state: boolean) {
    this.element.checked = state;
  }
  public GetElement() {
    return this.element;
  }
}
