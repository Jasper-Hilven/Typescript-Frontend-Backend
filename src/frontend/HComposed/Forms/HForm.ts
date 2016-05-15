/* tslint:disable */module frontend {
  export class HForm implements IHElement {
    elements: HDiv;
    receivedValue: { [id: string]: string; };
    checkFunction: ICheckFunction;
    formElementKeyToValue: { [id: string]: HFormTextElement; };
    action: HFormAction;
    constructor(hFactory: HFactory, divLayout: DivLayout, rows: HFormTextElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction) {
      this.elements = hFactory.GetDiv();
      this.StyleForm(this.elements);
      this.receivedValue = {};
      this.formElementKeyToValue = {};
      this.checkFunction = checkFunction;
      for (let rowI in rows) {
        let textElement = rows[rowI];
        this.elements.AddElement(textElement.GetVisualization());
        this.formElementKeyToValue[textElement.GetName()] = textElement;
        textElement.SetForm(this);
        this.receivedValue[textElement.GetName()] = textElement.GetDefaultValue();
      }
      this.action = new HFormAction(hFactory, divLayout, triggerFunction, cancelFunction);
      this.elements.AddElement(this.action.GetVisualization());
      this.Update();
    }

    GetElement() { return this.elements.GetElement(); }

    NotifyChanges(key: string, value: string) {
      this.receivedValue[key] = value;
      this.Update();
    }
    GetLatestValues(): { [id: string]: string; } {
      return this.receivedValue;
    }

    Update() {
      let result = this.checkFunction.CheckValues(this.receivedValue);
      let disableButton = false;
      for (let rI in result) {
        let res = result[rI];
        if(res.StatusType === HFormStatusType.Error)
          disableButton = true;
        this.formElementKeyToValue[rI].SetStatus(res);
      }
      this.action.SetDisabledOkButton(disableButton);
    }
    private StyleForm(form: HDiv) {
    }

  }
}
