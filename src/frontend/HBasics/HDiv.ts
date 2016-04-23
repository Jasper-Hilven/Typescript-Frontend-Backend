import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HDiv implements IHEl {
  element: HTMLDivElement;
  children: IHEl[];
  public constructor() {
    this.element = document.createElement("div");
    this.children = [];
  }

  public AddElement(hElement:IHEl) {
    this.children.push(hElement);
    this.element.appendChild(hElement.GetElement());
  }
  public GetElement() {
    return this.element;
  }

  public ReplaceElement(index: number, newElement: IHEl) {
    if (this.element.children.length <= index) {
      console.log(this.element);
      console.log(newElement);
      throw "Index is too big, not a replacement";
    }
    this.element.replaceChild(newElement.GetElement(), this.children[index].GetElement());
    this.children[index] = newElement;
  }
}
