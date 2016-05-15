/* tslint:disable */module frontend {
  export class HSpan implements IHElement {
    element: HTMLSpanElement;
    children: IHElement[];
    public constructor() {
      this.element = document.createElement("span");
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
