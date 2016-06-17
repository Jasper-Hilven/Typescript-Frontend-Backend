/// <reference path="./index.gen.ts"/>
module frontend {
    export class HFormWarningElement implements IFormElement {
        private warningDiv: HDiv;
        private decoAndWarningDiv: HDiv;
        public constructor(
            private decoratedElement: IFormElement,
            private hFactory: HFactory,
            private hDivLayout: DivLayout
        ) {
            this.warningDiv = hFactory.GetDivWithChild(new HTextSpan("Dummy"));
            this.decoAndWarningDiv = hDivLayout.GetUpDownFlexDiv(decoratedElement.GetVisualization(), this.warningDiv);
            this.setNotification(new HFormStatus(HFormStatusType.OK, ""));
        }
        public SetStatus(status: HFormStatus) {
          this.setNotification(status);
          this.decoratedElement.SetStatus(status);
        };
        private setNotification(status: HFormStatus) {
          this.warningDiv.ReplaceElement(0, this.GetNotificationForText(status));
        }
        private GetNotificationForText(status: HFormStatus) {
          if (status.StatusType === HFormStatusType.OK) {
            return this.hFactory.GetText(""); // DO NOT SHOW ANYTHING IF EVERYTHING IS ALLRIGHT.
          }
          let text = this.hFactory.GetText(status.Message);
          let warningClasses = (status.StatusType === HFormStatusType.Warning ? "alert-warning" : "alert-danger");
          this.hFactory.AddClasses(text, ["alert", warningClasses]);
          let styledText = this.hFactory.GetDivWithChild(text);
          styledText.GetElement().style.margin = "10px";
          return styledText;
        }


        public GetVisualization() {
           return this.decoAndWarningDiv;
        }
        GetName(){
          return this.decoratedElement.GetName();
        }
        SetForm(form: HForm): void{
         this.decoratedElement.SetForm(form);
        }
        GetDefaultValue(){
         return this.decoratedElement.GetDefaultValue();
        }

    }
}
