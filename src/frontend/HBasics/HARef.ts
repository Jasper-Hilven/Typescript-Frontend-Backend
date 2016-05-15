/* tslint:disable */
module frontend {

  export class HARef implements IHElement {
    element: HTMLAnchorElement;
    child: IHElement;
    hRef: string;
    public constructor(child: IHElement, hRef: string) {
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
}
