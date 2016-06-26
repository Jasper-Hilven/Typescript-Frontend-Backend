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
    public SetBorderAround(elem: IHElement,size){
      elem.GetElement().style.margin = size + "px";
    }
    public CreateLeftRightSplitElement(left: IHElement[], right: IHElement[]): IHElement {
       var leftDiv = this.CreateElementList(left);
       var rightDiv = this.CreateElementList(right);
       return this.divFactory.GetLeftRightFlexDiv(leftDiv,rightDiv);
     }
     public CreateLeftRightGroup(left:IHElement,right:IHElement){
      return this.CreateLeftRightSplitElement([left],[right]);
     }
     public CreateElementList(elements: IHElement[]): HDiv {
        var div = this.hFactory.GetDiv();
        elements.map(e => div.AddElement(e));
        return div;
      }

    CreateForm(rootElement: IHElement,elements: IFormElement[], checkFunction: ICheckFunction, triggerFunction, cancelFunction): HForm {
      let form = new HForm(this.hFactory, this.divFactory, elements,rootElement, checkFunction, triggerFunction, cancelFunction);
      return form;
    }

    EncapsulateWarnAndTitle(label: string, element: IFormElement): IFormElement {
      let warnElement = new HFormWarningElement(element, this.hFactory, this.divFactory);
      let titleElement = new HTitleElement(warnElement, this.hFactory, this.divFactory, label);
      return titleElement;
    }

    CreateTextElement(name: string, label: string, defaultValue: string,small: boolean): IFormElement {
      let textElement = new HFormTextElement(this.hFactory, this.divFactory, name, defaultValue,small);
      return this.EncapsulateWarnAndTitle(label, textElement);
    }
    CreateSelectElement(name: string, label: string, options: string[]): IFormElement {
      let selectElement = new HFormSelectElement(this.hFactory,name, options);
      return this.EncapsulateWarnAndTitle(label, selectElement);
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
