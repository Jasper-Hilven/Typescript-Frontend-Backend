import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import HTe = require("../../HBasics/HTextArea"); import HTextArea = HTe.HTextArea;
import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;
import IHFormModule = require("./IHForm"); import IHForm = IHFormModule.IHForm;
import HTb = require("../../HBasics/HTabling"); import HTable = HTb.HTable;

export class HFormTextElement {
  name: string;
  label: string;
  defaultValue: string;
  hFactory: HF;
  textBox: HTextArea;
  visualizationRow: HTb.HTableRow;
  form: IHForm;
  constructor(hFactory: HF, name: string, label: string, defaultValue: string) {
    this.hFactory = hFactory;
    this.name = name;
    this.label = label;
    this.defaultValue = defaultValue;
    var labelTextSpan = this.hFactory.GetText(this.label);
    labelTextSpan.GetElement().style.fontWeight = "bold";
    var left = this.hFactory.GetTableElementData(labelTextSpan);
    this.textBox = this.hFactory.GetTextAreaDim(1, 30);
    var right = this.hFactory.GetTableElementData(this.textBox);
    var retRow = this.hFactory.GetTableRow();
    retRow.AddCell(left);
    retRow.AddCell(right);
    this.visualizationRow = retRow;
    var me = this;
    this.textBox.element.oninput = function(ev: Event) { me.ValueChanges(ev) };
  };

  SetStatus(status: HFormStatus) {
    console.log("received status for: " + this.name + ":");
    console.log(status);
  };
  SetForm(form: IHForm) {
    this.form = form;
  };
  GetVisualizationRow() {
    return this.visualizationRow;
  }
  ValueChanges(ev: Event) {
    var value = this.textBox.GetElement().value;
    console.log("user entered new value for: " + this.name + ": " + value);
    this.form.NotifyChanges(this.name, value);
  }
}
