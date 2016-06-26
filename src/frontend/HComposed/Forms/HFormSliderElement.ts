/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormSliderElement implements IFormElement {

    private form: IHForm;
    private slider: HRangeSlider;
    public constructor(
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private name: string,
      sliderProvider: ISliderProvider,
      private sliderInfo: HRangeSliderInfo) {
      this.slider = hFactory.GetRangeSlider(sliderProvider, sliderInfo);
      this.slider.GetElement().style.margin = "6px auto";
      let me = this;
      this.slider.AddListener(me);
    };

    public GetName() {
      return this.name;
    }

    public GetDefaultValue() {
      return this.slider.GetSliderValue();
    }
    public SetStatus(status: HFormStatus) {
    };

    public SetForm(form: IHForm) {
      this.form = form;
    };

    public GetVisualization() {
      return this.slider;
    }

    public Notify(change) {
      console.log("user entered new value for: " + this.name + ": " + change[0] + ",");
      this.form.NotifyChanges(this.name, change[0] + "," + change[1]);
    }
  }
}
