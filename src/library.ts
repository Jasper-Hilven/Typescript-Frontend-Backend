export class SayHello {
  DoSomething() {
    alert("hallo From the library 4 you");
  }
}
export interface HElement {
  GetElement(): HTMLElement;
}
export class HButton implements HElement {
  element: HTMLButtonElement;
  public constructor(text: string) {

    var button = document.createElement("button");
    button.innerText = text;
    this.element = button;
  }

  public GetElement(): HTMLButtonElement {
    return this.element;
  }
}


export class HDiv implements HElement {
  element: HTMLDivElement;
  children: HElement[];
  public constructor() {
    this.element = document.createElement("div");
  }

  public AddElement(hElement: HElement) {
    this.element.appendChild(hElement.GetElement());
  }
  public GetElement(): HTMLDivElement {
    return this.element;
  }
}

export class HLabel implements HElement {
  element: HTMLLabelElement;
  public constructor(text: string) {
    var label = document.createElement("label");
    label.innerText = text;
    this.element = label;
  }
  public GetElement(): HTMLLabelElement {
    return this.element;
  }
}
export class HTextAreaElement implements HElement {
  element: HTMLTextAreaElement;
  public constructor() {
    var label = document.createElement("textarea");
    this.element = label;
  }
  public GetElement(): HTMLTextAreaElement {
    return this.element;
  }
}  
