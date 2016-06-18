/* tslint:disable */
/// <reference path="./index.gen.ts"/>
module frontend {
  export class HFormAction {
    private okButton: HButton;
    private cancelButton: HButton;
    constructor(private hFactory: HFactory, private divLayout: DivLayout, private confirmAction, private cancelAction) {
    }

    GetVisualization(): HDiv {
      let ok = this.divLayout.GetButton("OK", () => { this.confirmAction() }, "success");
      this.okButton = ok;
      let cancel = this.divLayout.GetButton("Cancel", () => { this.cancelAction() }, "default");
      this.cancelButton = cancel;
      return this.divLayout.GetLeftRightFlexDiv(ok, cancel);
    }
    SetDisabledOkButton(disabled: boolean) {
      this.okButton.SetDisabled(disabled);
    }
  }
}
