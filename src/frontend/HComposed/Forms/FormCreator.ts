/* tslint:disable */
/// <reference path="./HForm.ts"/>

module frontend {
  export class FormCreator {
    divFactory: DivLayout;
    hFactory: HFactory;

    public constructor(divFactory: DivLayout, hFactory: HFactory) {
      this.divFactory = divFactory;
      this.hFactory = hFactory;
    }

    CreateForm(rows: HFormTextElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction): HForm {
      let form = new HForm(this.hFactory, this.divFactory, rows, checkFunction, triggerFunction, cancelFunction);
      return form;
    }

    CreateTextElement(name: string, label: string, defaultValue: string): HFormTextElement {
      return new HFormTextElement(this.hFactory, this.divFactory, name, label, defaultValue);
    }
  }
}
