/* tslint:disable */
module frontend {
    export class HDiv implements IHElement {
        element: HTMLDivElement;
        children: IHElement[];
        public constructor() {
            this.element = document.createElement("div");
            this.children = [];
        }

        public AddElement(hElement: IHElement) {
            this.children.push(hElement);
            this.element.appendChild(hElement.GetElement());
        }

        public RemoveAllChildren() {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }

        public GetElement() {
            return this.element;
        }

        public ReplaceElement(index: number, newElement: IHElement) {
            if (this.element.children.length <= index) {
                console.log(this.element);
                console.log(newElement);
                throw "Index is too big, not a replacement";
            }
            this.element.replaceChild(newElement.GetElement(), this.children[index].GetElement());
            this.children[index] = newElement;
        }
    }
}
