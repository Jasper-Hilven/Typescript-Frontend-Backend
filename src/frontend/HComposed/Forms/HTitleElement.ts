/// <reference path="./index.gen.ts"/>
module frontend {
  export class HTitleElement implements IFormElement {
    private titleAndDecoDiv: HDiv;
    public constructor(
      private decoratedElement: IFormElement,
      private hFactory: HFactory,
      private hDivLayout: DivLayout,
      private title: string
    ) {
      let titleElem = this.GetLabelFromText(title);
      this.titleAndDecoDiv = hDivLayout.GetUpDownFlexDiv(titleElem, decoratedElement.GetVisualization());
    }
    public SetStatus(status: HFormStatus) {
      this.decoratedElement.SetStatus(status);
    };

    public GetVisualization() {
      return this.titleAndDecoDiv;
    }
    GetName() {
      return this.decoratedElement.GetName();
    }
    SetForm(form: HForm): void {
      this.decoratedElement.SetForm(form);
    }
    GetDefaultValue() {
      return this.decoratedElement.GetDefaultValue();
    }
    private GetLabelFromText(labelText: string) {
      let labelTextSpan = this.hFactory.GetH3(this.hFactory.GetText(labelText));
      labelTextSpan.GetElement().style.fontWeight = "bold";
      let styledLable = this.hFactory.GetDivWithChild(labelTextSpan);
      styledLable.GetElement().style.marginTop = "18px";
      styledLable.GetElement().style.marginBottom = "2px";
      return styledLable;
    }

  }
}
