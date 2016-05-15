/* tslint:disable */module frontend {
  export class HRadioButton implements IHElement {
    element: HTMLInputElement;
    public constructor() {
      this.element = document.createElement("input");
      this.element.setAttribute("type", "radio");
    }

    public IsChecked() {
      return this.element.checked;
    }
    public SetChecked(state: boolean) {
      this.element.checked = state;
    }
    public GetElement() {
      return this.element;
    }
  }
}
