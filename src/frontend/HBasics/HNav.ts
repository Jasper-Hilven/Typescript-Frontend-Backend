/* tslint:disable */module frontend {
  export class HNav implements IHElement {
    element: HTMLSpanElement;
    children: IHElement[];
    public constructor() {
      this.element = document.createElement("nav");
      this.children = [];
    }

    public AddElement(hElement) {
      this.children.push(hElement);
      this.element.appendChild(hElement.GetElement());
    }
    public GetElement() {
      return this.element;
    }
  }
}
