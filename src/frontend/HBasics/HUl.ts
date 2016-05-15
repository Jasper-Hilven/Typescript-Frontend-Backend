module frontend {
  export class HUl implements IHElement {
    private element: HTMLUListElement;
    private children: HLi[];
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
}
