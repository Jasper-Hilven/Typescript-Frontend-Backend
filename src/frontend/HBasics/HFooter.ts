/* tslint:disable */module frontend {
  export class HFooter implements IHElement {
    element: HTMLElement;
    child: IHElement;
    // Children: IHEl[];
    public constructor(child: IHElement) {
      this.element = document.createElement("footer");
      this.element.appendChild(child.GetElement());
      this.child = child;
    }

    public GetElement() {
      return this.element;
    }
  }
}
