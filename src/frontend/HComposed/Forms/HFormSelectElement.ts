/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormSelectElement implements IFormElement {

    private form: IHForm;
    private picker: HSelectPicker;
    public constructor(
      private hFactory: HFactory,
      private name: string,
      private elements: string[]) {
       this.picker = hFactory.GetSelectPicker(elements);
      let me = this;
      this.picker.Register(function(ev) { me.ValueChanges(ev); });
    };

    public GetName() {
      return this.name;
    }

    public GetDefaultValue() {
      return this.elements[0];
    }

    public SetStatus(){
    }

    public SetForm(form: IHForm) {
      this.form = form;
    };

    public GetVisualization() {
      return this.picker;
    }

    private ValueChanges(newValue) {
     this.form.NotifyChanges(this.name, newValue);
    }
  }
}
