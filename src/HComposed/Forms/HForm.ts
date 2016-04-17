import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import IHELement = require("../../HBasics/IHElement"); import IHEl = IHELement.IHElement;
import HTb = require("../../HBasics/HTabling"); import HTable = HTb.HTable;
import HDivModule = require("../../HBasics/HDiv"); import HDiv = HDivModule.HDiv;
import HFormTextElementModule = require("./HFormTextElement"); import HFormTextElement = HFormTextElementModule.HFormTextElement;
import ICheckFunctionModule = require("./ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;

export class HForm implements IHEl {
  elements: HDiv;
  receivedValue: any;
  checkFunction: ICheckFunction;
  formElementKeyToValue: { [id: string]: HFormTextElement; };

  constructor(hFactory: HF, rows: HFormTextElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction) {
    this.elements = hFactory.GetDiv();
    this.receivedValue = {};
    this.formElementKeyToValue = {};
    this.checkFunction = checkFunction;
    for (var rowI in rows) {
      var textElement = rows[rowI];
      this.elements.AddElement(textElement.GetVisualization());
      this.formElementKeyToValue[textElement.GetName()] = textElement;
      textElement.SetForm(this);
      this.receivedValue[textElement.GetName()] = textElement.GetDefaultValue();
    }
  }

  GetElement() { return this.elements.GetElement(); }

  NotifyChanges(key: string, value: string) {
    this.receivedValue[key] = value;
    this.Update();
  }

  Update() {
    var result = this.checkFunction.CheckValues(this.receivedValue);
    for (var rI in result)
      this.formElementKeyToValue[rI].SetStatus(result[rI]);
  }

}
