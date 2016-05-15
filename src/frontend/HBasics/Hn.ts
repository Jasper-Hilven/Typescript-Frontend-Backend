/* tslint:disable */module frontend {

  export class Hn implements IHElement {
    element: HTMLHeadingElement;
    child: IHElement;

    public constructor(child: IHElement, nbHeading: number) {
      if (nbHeading != 1 && nbHeading != 2 && nbHeading != 3 &&
        nbHeading != 4 && nbHeading != 5 && nbHeading != 6) {
        throw "Number should be 1,2,3,4,5 or 6.";
      }
      this.element = <HTMLHeadingElement>document.createElement("h" + nbHeading);
      this.child = child;
      this.element.appendChild(child.GetElement());
    }
    public GetElement() {
      return this.element;
    }
  }
}
