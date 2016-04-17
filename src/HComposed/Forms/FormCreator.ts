import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;
import DivLayout = require("./../DivLayout");
import IHELement = require("../../HBasics/IHElement"); import IHEl = IHELement.IHElement;
import HTe = require("../../HBasics/HTextArea"); import HTextArea = HTe.HTextArea;
import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import HFormTextElementModule = require("./HFormTextElement"); import HFormTextElement = HFormTextElementModule.HFormTextElement;
import ICheckFunctionModule = require("./ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFormModule = require("./HForm"); import HForm = HFormModule.HForm;


export class FormCreator {
  divFactory: DivLayout.DivLayout;
  hFactory: HF;

  public constructor(divFactory: DivLayout.DivLayout, hFactory: HF) {
    this.divFactory = divFactory;
    this.hFactory = hFactory;
  }

  CreateForm(rows: HFormTextElement[], checkFunction: ICheckFunction): HForm {
    var form = new HForm(this.hFactory, rows, checkFunction, undefined, undefined);
    return form;
  }

  CreateTextElement(name: string, label: string, defaultValue: string): HFormTextElement {
    return new HFormTextElement(this.hFactory, this.divFactory, name, label, defaultValue);
  }
}
