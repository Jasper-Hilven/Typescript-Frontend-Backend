/* tslint:disable */
/// <reference path="./index.gen.ts"/>

module frontend {
  export class FormCreator {

    public constructor(
      private divFactory: DivLayout,
      private hFactory: HFactory,
      private datePickerProvider: IDatePickerProvider,
      private sliderProvider: ISliderProvider) {
    }

    CreateForm(rows: IFormElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction): HForm {
      let form = new HForm(this.hFactory, this.divFactory, rows, checkFunction, triggerFunction, cancelFunction);
      return form;
    }

    EncapsulateWarnAndTitle(label: string, element: IFormElement): IFormElement {
      let warnElement = new HFormWarningElement(element, this.hFactory, this.divFactory);
      let titleElement = new HTitleElement(warnElement, this.hFactory, this.divFactory, label);
      return titleElement;
    }

    CreateTextElement(name: string, label: string, defaultValue: string): IFormElement {
      let textElement = new HFormTextElement(this.hFactory, this.divFactory, name, defaultValue);
      return this.EncapsulateWarnAndTitle(label, textElement);
    }
    CreateSelectElement(name: string, label: string, options: string[]): IFormElement {
      let textElement = new HFormTextElement(this.hFactory, this.divFactory, name, defaultValue);
      return this.EncapsulateWarnAndTitle(label, textElement);
    }

    CreateSliderElement(name: string, label: string, sliderInfo: HRangeSliderInfo): IFormElement {
      let sliderElement = new HFormSliderElement(this.hFactory, this.divFactory, name, this.sliderProvider, sliderInfo);
      return this.EncapsulateWarnAndTitle(label, sliderElement);
    }

    CreateDatePickerElement(name: string, label: string): IFormElement {
      let datePickerElement = new HFormDatePickerElement(this.hFactory, this.divFactory, name, this.datePickerProvider);
      return this.EncapsulateWarnAndTitle(label, datePickerElement);
    }
  }
}
