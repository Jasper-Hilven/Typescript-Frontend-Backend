import DivFactory = require("./DivFactory");
import DVF = DivFactory.DivFactory;
import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;

export class FormCreator {
  divFactory: DVF;
  hFactory: HF;
  public constructor(divFactory, hFactory) {
    this.divFactory = divFactory;
    this.hFactory = hFactory;
  }
  GetFirstForm() {
    var mainDiv = this.hFactory.GetDiv();
    mainDiv.AddElement(this.GetLabelTextPair("Name"));
    mainDiv.AddElement(this.GetLabelTextPair("Age"));

    return mainDiv;
  }
  GetLabelTextPair(labelText) {
    var left = this.hFactory.GetLabel(labelText);
    var right = this.hFactory.GetTextArea();
    var retDiv = this.divFactory.GetLeftRightFlexDiv(left, right);
    return retDiv;
  }
}
