/* tslint:disable */module frontend {
  export class HTextSpan implements IHElement {
    element: HTMLSpanElement;
    public constructor(text: string) {
      this.element = document.createElement("span");
      this.element.innerText = text;
    }

    public GetElement() {
      return this.element;
    }
  }
}
