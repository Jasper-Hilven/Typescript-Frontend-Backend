declare var Slider;
module frontend {
  export class HRangeSliderInfo {
    constructor(public min: number, public max: number, public initMin: number, public initMax: number, public step: number) {
    }
  }
  export class HRangeSlider implements IHElement {
    element: HTMLInputElement;
    parentElement: HTMLDivElement;
    jsSlider: any;
    listeners: any[];
    public constructor(sliderProvider: ISliderProvider, min: number, max: number, initMin: number, initMax: number, step: number) {
      this.element = document.createElement("input");
      this.element.id = "ex2";
      this.element.setAttribute("data-slider-id", 'ex1Slider');
      this.element.setAttribute("type", "text");
      this.element.width = "200px";
      this.parentElement = document.createElement("div");
      this.parentElement.style.width = "100%";
      this.parentElement.style.height = "100%";
      this.parentElement.appendChild(this.element);
      this.DataSliderMin = min;
      this.DataSliderMax = max;
      this.DataSliderStep = step;
      this.SetSliderValue(initMin, initMax);
      this.jsSlider = <any>sliderProvider.getSlider(this.element, {});
      var me = this;
      this.jsSlider.on("slide", function(change) {
        console.log("slide occured");
        console.log(change);
        me.Changed(change);
      });
      this.listeners = [];
    }
    AddListener(listener) {
      this.listeners.push(listener);
    }
    Changed(o) {
      this.listeners.map(listener => listener.Notify(o));
    }



    GetSliderValue(): string {
      return this.element.getAttribute("data-slider-value").replace("[", "").replace("]", "").trim();
    }
    SetSliderValue(minVal: number, maxVal: number) {
      this.element.setAttribute("data-slider-value", "[" + minVal + "," + maxVal + "]");
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
