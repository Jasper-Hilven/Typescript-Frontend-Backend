import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HTextArea implements IHEl {
  element: HTMLTextAreaElement;
  public constructor() {
    var label = document.createElement("textarea");
    this.element = label;
  }
  public GetElement(): HTMLTextAreaElement {
    return this.element;
  }
}
