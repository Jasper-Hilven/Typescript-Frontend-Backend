import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import HDivModule = require("../../HBasics/HDiv"); import HDiv = HDivModule.HDiv;
import HTe = require("../../HBasics/HTextArea"); import HTextArea = HTe.HTextArea;
import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;
import IHFormModule = require("./IHForm"); import IHForm = IHFormModule.IHForm;
import HTextModule = require("../../HBasics/HText"); import HTextSpan = HTextModule.HTextSpan;
import HTb = require("../../HBasics/HTabling"); import HTable = HTb.HTable;
import HDivLayoutModule = require("../DivLayout"); import HDivLayout = HDivLayoutModule.DivLayout;
export class HFormTextElement {

  visDiv: HDiv;
  form: IHForm;
  textBox: HTextArea;
  warningDiv: HDiv;
  constructor(private hFactory: HF, private hDivLayout: HDivLayout, private name: string, private label: string, private defaultValue: string) {
    var title = this.GetLabelFromText(label);
    var input = this.GetInputFromText(defaultValue);
    this.warningDiv = hFactory.GetDivWithChild(new HTextSpan("Dummy"));
    this.setNotification(new HFormStatus(HFormStatusType.OK, ""));
    var inputAndWarningDiv = hDivLayout.GetUpDownFlexDiv(input, this.warningDiv);
    this.visDiv = hDivLayout.GetUpDownFlexDiv(title, inputAndWarningDiv);

    var me = this;
    this.textBox.element.oninput = function(ev: Event) { me.ValueChanges(ev) };
  };


  GetName() {
    return this.name;
  }
  GetLabel() {
    return this.label;
  }
  GetDefaultValue() {
    return this.defaultValue;
  }

  private GetInputFromText(defaultValue) {
    this.textBox = this.hFactory.GetTextArea();
    this.textBox.element.style.width = "600px";
    this.textBox.SetText(defaultValue);
    var styled = this.hFactory.GetDivWithChild(this.textBox);
    this.textBox.GetElement().style.margin = "2px";
    return styled;
  }
  private GetLabelFromText(labelText) {
    var labelTextSpan = this.hFactory.GetH3(this.hFactory.GetText(this.label));
    labelTextSpan.GetElement().style.fontWeight = "bold";
    var styledLable = this.hFactory.GetDivWithChild(labelTextSpan);
    styledLable.GetElement().style.marginTop = "18px";
    styledLable.GetElement().style.marginBottom = "2px";
    return styledLable;
  }
  private setNotification(status: HFormStatus) {
    this.warningDiv.ReplaceElement(0, this.GetNotificationForText(status));
  }
  private GetNotificationForText(status: HFormStatus) {
    if (status.StatusType == HFormStatusType.OK)
      return this.hFactory.GetText(""); // DO NOT SHOW ANYTHING IF EVERYTHING IS ALLRIGHT.
    var text = this.hFactory.GetText(status.Message);
    var warningClasses = (status.StatusType == HFormStatusType.Warning ? "alert-warning" : "alert-danger");
    this.hFactory.AddClasses(text, ["alert", warningClasses]);
    var styledText = this.hFactory.GetDivWithChild(text);
    styledText.GetElement().style.margin = "10px";
    return styledText;
  }

  SetStatus(status: HFormStatus) {
    console.log("received status for: " + this.name + ":");
    console.log(status);
    this.setNotification(status);
  };

  SetForm(form: IHForm) {
    this.form = form;
  };

  GetVisualization() {
    return this.visDiv;
  }

  ValueChanges(ev: Event) {
    var value = this.textBox.GetText();
    console.log("user entered new value for: " + this.name + ": " + value);
    this.form.NotifyChanges(this.name, value);
  }

}
