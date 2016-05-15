module frontend {
  export class HParag implements IHElement {
    private element: HTMLParagraphElement;
    private child: IHElement;

    public constructor(child: IHElement) {
      this.child = child;
      let d = document.createElement("p");
      d.appendChild(child.GetElement());
      this.element = d;
    }
    public GetElement() {
      return this.element;
    }
  }
}
