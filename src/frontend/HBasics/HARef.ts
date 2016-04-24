import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HARef implements IHEl {
  element: HTMLAnchorElement;
  child: IHEl;
  hRef: string;
  public constructor(child: IHEl, hRef: string) {
    this.element = document.createElement("a");
    this.child = child;
    this.hRef = hRef;
    this.element.appendChild(child.GetElement());
    this.element.setAttribute("href", hRef);
  }
  public GetElement() {
    return this.element;



    
  }
}
