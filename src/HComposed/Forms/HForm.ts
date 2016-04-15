import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import IHELement = require("../../HBasics/IHElement"); import IHEl = IHELement.IHElement;
import HTb = require("../../HBasics/HTabling"); import HTable = HTb.HTable;
import HFormTextElementModule = require("./HFormTextElement"); import HFormTextElement = HFormTextElementModule.HFormTextElement;
import ICheckFunctionModule = require("./ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;

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
  }
  GetElement() { return this.table.GetElement(); }

  NotifyChanges(key: string, value: string) {
    this.receivedValue[key] = value;
    var result = this.checkFunction.CheckValues(this.receivedValue);
    for (var rI in result)
      this.formElementKeyToValue[rI].SetStatus(result[rI]);
  }


}
