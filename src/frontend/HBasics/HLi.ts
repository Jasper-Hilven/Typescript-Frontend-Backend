/* tslint:disable */module frontend {

  export class HLi implements IHElement {
    element: HTMLLIElement;
    child: IHElement;
    // Children: IHEl[];
    public constructor(child: IHElement) {
      this.element = document.createElement("li");
      this.element.appendChild(child.GetElement());
      this.child = child;
    }

    public GetElement() {
      return this.element;
    }
  }
}
