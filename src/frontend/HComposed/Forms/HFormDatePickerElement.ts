/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormDatePickerElement implements IFormElement{

    private form: IHForm;
    private datePicker: HDatePicker;
    public constructor(
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private name: string) {

      let me = this;
      this.datePicker = hFactory.GetDatePicker();
      this.datePicker.AddListener(me);
    };

    public GetName() {
      return this.name;
    }

    public GetDefaultValue():string {
      return this.datePicker.GetDate();
    }
    public SetStatus(status: HFormStatus) {
    };

    public SetForm(form: IHForm) {
      this.form = form;
    };

    public GetVisualization() {
      return this.datePicker;
    }

    public Notify(change) {
      console.log("user entered new value for: " + this.name + ": " + change);
      this.form.NotifyChanges(this.name, change);
    }
  }
}
