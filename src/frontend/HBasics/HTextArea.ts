import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HTextArea implements IHEl {
  element: HTMLTextAreaElement;
  public constructor() {
    var area = document.createElement("textarea");
    this.element = area;
  }
  public GetElement(): HTMLTextAreaElement {
    return this.element;
  }
  public SetText(text: string) {
    this.element.value = text;
  }
  public GetText(): string {
    return this.element.value;
  }

}
