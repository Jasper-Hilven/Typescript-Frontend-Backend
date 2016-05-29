/* tslint:disable */
/// <reference path="./index.ts"/>

module frontend {
  export class FormCreator {
    divFactory: DivLayout;
    hFactory: HFactory;

    public constructor(divFactory: DivLayout, hFactory: HFactory) {
      this.divFactory = divFactory;
      this.hFactory = hFactory;
    }

    CreateForm(rows: IFormElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction): HForm {
      let form = new HForm(this.hFactory, this.divFactory, rows, checkFunction, triggerFunction, cancelFunction);
      return form;
    }

    CreateTextElement(name: string, label: string, defaultValue: string): IFormElement {
      let textElement = new HFormTextElement(this.hFactory, this.divFactory, name,  defaultValue);
      let warnElement = new HFormWarningElement(textElement, this.hFactory,this.divFactory);
      let titleElement = new HTitleElement(warnElement,this.hFactory, this.divFactory,label);
      return titleElement;
    }
  }
}
