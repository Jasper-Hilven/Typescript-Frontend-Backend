/* tslint:disable */
module frontend {

    export class HButton implements IHElement {
        element: HTMLButtonElement;
        child: IHElement;
        public constructor(child: IHElement) {
            this.child = child;
            let button = document.createElement("button");
            button.appendChild(child.GetElement());
            this.element = button;
        }

        public GetElement() {
            return this.element;
        }
        public SetAction(action) {
            this.element.onclick = function() { action(); };
        }
        public SetDisabled(disabled) {
            this.element.disabled = disabled;
        }
    }
}
