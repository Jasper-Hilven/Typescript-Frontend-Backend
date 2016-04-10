import HE = require("./IHElement");
import IHEl = HE.IHElement;
import HLiM = require("./HLi");
import HLi = HLiM.HLi;
export class HUl implements IHEl {
  element: HTMLUListElement;
  children: HLi[];
  public constructor() {
    this.element = document.createElement("ul");
    this.children = [];
  }

  public AddElement(hElement: HLi) {
    this.children.push(hElement);
    this.element.appendChild(hElement.GetElement());
  }
  public GetElement() {
    return this.element;
  }
}
