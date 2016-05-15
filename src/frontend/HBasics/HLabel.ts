/* tslint:disable */module frontend {

  export class HLabel implements IHElement {
    element: HTMLLabelElement;
    child: IHElement;

    public constructor(child: IHElement) {
      this.child = child;
      let label = document.createElement("label");
      label.appendChild(child.GetElement());
      this.element = label;
    }
    public GetElement() {
      return this.element;
    }
  }
}
