/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormDatePickerElement implements IFormElement {

    private form: IHForm;
    private datePicker: HDatePicker;
    private visDiv: HDiv;
    public constructor(
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private name: string,
      private datePickerProvider: IDatePickerProvider) {

      let me = this;

      this.datePicker = hFactory.GetDatePicker(datePickerProvider);
      this.datePicker.AddListener(me);
      this.visDiv = hFactory.GetDiv();
      this.visDiv.AddElement(this.datePicker);
    };

    public GetName() {
      return this.name;
    }

    public GetDefaultValue(): string {
      return this.datePicker.GetDate();
    }
    public SetStatus(status: HFormStatus) {
    };

    public SetForm(form: IHForm) {
      this.form = form;
    };

    public GetVisualization() {
      return this.visDiv;
    }

    public Notify(change) {
      console.log("user entered new value for: " + this.name + ": " + change);
      this.form.NotifyChanges(this.name, change);
    }
  }
}
