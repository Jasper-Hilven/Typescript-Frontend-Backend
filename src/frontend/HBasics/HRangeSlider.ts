declare var Slider;
module frontend {
    export class HRangeSlider implements IHElement {
        element: HTMLInputElement;
        parentElement: HTMLDivElement;

        jsSlider: Object;
        public constructor(min: number, max: number, initMin: number, initMax: number, step: number) {
            this.element = document.createElement("input");
            this.element.id= "ex2";
            this.element.setAttribute("data-slider-id",'ex1Slider');
            this.element.setAttribute("type", "text");

            this.element.width = "500px";
            this.parentElement = document.createElement("div");
            this.parentElement.style.width= "100%";
            this.parentElement.style.height= "100%";
            this.parentElement.appendChild(this.element);
            this.DataSliderMin = min;
            this.DataSliderMax = max;
            this.DataSliderStep = step;
            this.element.setAttribute("data-slider-value", "[" + initMin + "," + initMax + "]");
            this.jsSlider = new Slider(this.element, {});


        }
        get DataSliderMin(): number {
            return Number(this.element.getAttribute("data-slider-min"));
        }

        set DataSliderMin(value: number) {
            this.element.setAttribute("data-slider-min", value.toString());
        }
        get DataSliderMax(): number {
            return Number(this.element.getAttribute("data-slider-max"));
        }

        set DataSliderMax(value: number) {
            this.element.setAttribute("data-slider-max", value.toString());
        }
        get DataSliderStep(): number {
            return Number(this.element.getAttribute("data-slider-step"));
        }

        set DataSliderStep(value: number) {
            this.element.setAttribute("data-slider-step", value.toString());
        }

        public GetElement() {
            return this.parentElement;
        }




    }
}
