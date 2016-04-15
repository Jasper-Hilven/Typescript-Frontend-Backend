import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import DivLayout = require("./DivLayout");
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
import HTb = require("../HBasics/HTabling");
import HTable = HTb.HTable;
import HTe = require("../HBasics/HTextArea");
import HTextArea = HTe.HTextArea;

export class FormCreator {
  divFactory: DivLayout.DivLayout;
  hFactory: HF;

  public constructor(divFactory: DivLayout.DivLayout, hFactory: HF) {
    this.divFactory = divFactory;
    this.hFactory = hFactory;
  }
  CreateForm(rows: HFormTextElement[], checkFunction: ICheckFunction) {
    var form = new HForm(this.hFactory, rows, checkFunction, undefined, undefined);
    return form;
  }
  CreateTextElement(name: string, label: string, defaultValue: string): HFormTextElement {
    return new HFormTextElement(this.hFactory, name, label, defaultValue);
  }
}
export enum HFormStatusType {
  OK, Warning, Error
}
export class HFormStatus { constructor(public StatusType: HFormStatusType, public Message: string) { } }

export class HFormTextElement {
  name: string;
  label: string;
  defaultValue: string;
  hFactory: HF;
  textBox: HTextArea;
  visualizationRow: HTb.HTableRow;
  form: HForm;
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
  SetForm(form: HForm) {
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



export class HForm implements IHEl {
  table: HTable;
  receivedValue: any;
  checkFunction: ICheckFunction;
  formElementKeyToValue: { [id: string]: HFormTextElement; };
  constructor(hFactory: HF, rows: HFormTextElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction) {
    this.table = hFactory.GetTable();
    this.receivedValue = {};
    this.formElementKeyToValue = {};
    this.checkFunction = checkFunction;
    for (var rowI in rows) {
      var textElement = rows[rowI];
      this.table.AddRow(textElement.GetVisualizationRow());
      this.formElementKeyToValue[textElement.name] = textElement;
      textElement.SetForm(this);
      this.receivedValue[textElement.name] = textElement.defaultValue;
    }
    //
  }
  GetElement() { return this.table.GetElement(); }

  NotifyChanges(key: string, value: string) {
    this.receivedValue[key] = value;
    var result = this.checkFunction.CheckValues(this.receivedValue);
    for (var rI in result)
      this.formElementKeyToValue[rI].SetStatus(result[rI]);
  }


}
