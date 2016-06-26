/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormTextElement implements IFormElement {

    private form: IHForm;
    private textBox: HTextArea;
    private visDiv: HDiv;
    public constructor(
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private name: string,
      private defaultValue: string,
     private singleLine: boolean) {
      let input = this.GetInputFromText(singleLine,defaultValue);

      this.visDiv = input;
      let me = this;
      this.textBox.GetElement().oninput = function(ev: Event) { me.ValueChanges(ev); };
    };

    public GetName() {
      return this.name;
    }

    public GetDefaultValue() {
      return this.defaultValue;
    }
    public SetStatus(status: HFormStatus) {
    };

    public SetForm(form: IHForm) {
      this.form = form;
    };

    public GetVisualization() {
      return this.visDiv;
    }

    public ValueChanges(ev: Event) {
      let value = this.textBox.GetText();
      console.log("user entered new value for: " + this.name + ": " + value);
      this.form.NotifyChanges(this.name, value);
    }

    private GetInputFromText(singleLine: boolean,defaultValue: string) {
      this.textBox = this.hFactory.GetTextArea();
      this.textBox.GetElement().style.width = "400px";
      this.textBox.SetText(defaultValue);
      let styled = this.hFactory.GetDivWithChild(this.textBox);
      this.textBox.GetElement().style.margin = "2px";
      this.textBox.SetRows(singleLine? 1 : 2);
      return styled;
    }

  }
}
