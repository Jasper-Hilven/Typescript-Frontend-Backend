import {DivLayout} from "../DivLayout";
import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import IHELement = require("../../HBasics/IHElement"); import IHEl = IHELement.IHElement;
import HTb = require("../../HBasics/HTabling"); import HTable = HTb.HTable;
import HDivModule = require("../../HBasics/HDiv"); import HDiv = HDivModule.HDiv;
import HFormTextElementModule = require("./HFormTextElement"); import HFormTextElement = HFormTextElementModule.HFormTextElement;
import HFormActionModule = require("./HFormAction");
import ICheckFunctionModule = require("./ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFactory = require("./../../HBasics/HFactory"); import HF = HFactory.HFactory;

export class HForm implements IHEl {
    elements: HDiv;
    receivedValue: { [id: string]: string; };
    checkFunction: ICheckFunction;
    formElementKeyToValue: { [id: string]: HFormTextElement; };

    constructor(hFactory: HF, divLayout: DivLayout, rows: HFormTextElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction) {
        console.log("Constructing form");
        this.elements = hFactory.GetDiv();
        this.StyleForm(this.elements);
        this.receivedValue = {};
        this.formElementKeyToValue = {};
        this.checkFunction = checkFunction;
        console.log("Adding rows");
        for (var rowI in rows) {
            var textElement = rows[rowI];
            this.elements.AddElement(textElement.GetVisualization());
            this.formElementKeyToValue[textElement.GetName()] = textElement;
            textElement.SetForm(this);
            this.receivedValue[textElement.GetName()] = textElement.GetDefaultValue();
        }
        console.log("Creating action");
        var action = new HFormActionModule.HFormAction(hFactory, divLayout, triggerFunction, cancelFunction);
        console.log("Adding action");
        this.elements.AddElement(action.GetVisualization());
        console.log("constructed form");
    }

    GetElement() { return this.elements.GetElement(); }

    NotifyChanges(key: string, value: string) {
        this.receivedValue[key] = value;
        this.Update();
    }
    GetLatestValues():{ [id: string]: string; }{
      return this.receivedValue;
    }

    Update() {
        var result = this.checkFunction.CheckValues(this.receivedValue);
        for (var rI in result) {
            this.formElementKeyToValue[rI].SetStatus(result[rI]);
        }
    }
    private StyleForm(form: HDiv) {
    }

}
