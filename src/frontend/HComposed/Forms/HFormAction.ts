import {HDiv} from "../../HBasics/HDiv";
import {DivLayout} from "../DivLayout";
import {HFactory} from "../../HBasics/HFactory";
export class HFormAction {
  constructor(private hFactory: HFactory, private divLayout: DivLayout, private confirmAction, private cancelAction) {
  }

  GetVisualization():HDiv {
    console.log("constructing buttons");
    var ok = this.hFactory.GetButton(this.hFactory.GetText("OK"));
    ok.SetAction(this.confirmAction);
    var cancel = this.hFactory.GetButton(this.hFactory.GetText("Cancel"));
    cancel.SetAction(this.cancelAction);
    console.log("constructing div");
    return this.divLayout.GetLeftRightFlexDiv(ok, cancel);
  }

}
