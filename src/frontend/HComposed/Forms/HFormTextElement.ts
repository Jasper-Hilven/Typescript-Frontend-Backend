module frontend {
  export class HFormTextElement {

    private visDiv: HDiv;
    private form: IHForm;
    private textBox: HTextArea;
    private warningDiv: HDiv;

    public constructor(
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private name: string,
      private label: string,
      private defaultValue: string) {
      let title = this.GetLabelFromText(label);
      let input = this.GetInputFromText(defaultValue);
      this.warningDiv = hFactory.GetDivWithChild(new HTextSpan("Dummy"));
      this.setNotification(new HFormStatus(HFormStatusType.OK, ""));
      let inputAndWarningDiv = hDivLayout.GetUpDownFlexDiv(input, this.warningDiv);
      this.visDiv = hDivLayout.GetUpDownFlexDiv(title, inputAndWarningDiv);

      let me = this;
      this.textBox.GetElement().oninput = function(ev: Event) { me.ValueChanges(ev); };
    };

    public GetName() {
      return this.name;
    }

    public GetLabel() {
      return this.label;
    }
    public GetDefaultValue() {
      return this.defaultValue;
    }
    public SetStatus(status: HFormStatus) {
      console.log("received status for: " + this.name + ":");
      console.log(status);
      this.setNotification(status);
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

    private GetInputFromText(defaultValue: string) {
      this.textBox = this.hFactory.GetTextArea();
      this.textBox.GetElement().style.width = "600px";
      this.textBox.SetText(defaultValue);
      let styled = this.hFactory.GetDivWithChild(this.textBox);
      this.textBox.GetElement().style.margin = "2px";
      return styled;
    }
    private GetLabelFromText(labelText: string) {
      let labelTextSpan = this.hFactory.GetH3(this.hFactory.GetText(this.label));
      labelTextSpan.GetElement().style.fontWeight = "bold";
      let styledLable = this.hFactory.GetDivWithChild(labelTextSpan);
      styledLable.GetElement().style.marginTop = "18px";
      styledLable.GetElement().style.marginBottom = "2px";
      return styledLable;
    }
    private setNotification(status: HFormStatus) {
      this.warningDiv.ReplaceElement(0, this.GetNotificationForText(status));
    }
    private GetNotificationForText(status: HFormStatus) {
      if (status.StatusType === HFormStatusType.OK) {
        return this.hFactory.GetText(""); // DO NOT SHOW ANYTHING IF EVERYTHING IS ALLRIGHT.
      }
      let text = this.hFactory.GetText(status.Message);
      let warningClasses = (status.StatusType === HFormStatusType.Warning ? "alert-warning" : "alert-danger");
      this.hFactory.AddClasses(text, ["alert", warningClasses]);
      let styledText = this.hFactory.GetDivWithChild(text);
      styledText.GetElement().style.margin = "10px";
      return styledText;
    }


  }
}
