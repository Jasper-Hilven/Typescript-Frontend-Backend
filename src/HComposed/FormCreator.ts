import DivFactory = require("./DivFactory");
import DVF = DivFactory.DivFactory;
import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
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
  GetLabelTextPair(labelText: string) {
    var left = this.hFactory.GetLabel(this.hFactory.GetText(labelText));
    var right = this.hFactory.GetTextAreaDim(5, 60);
    var retDiv = this.divFactory.GetLeftRightFlexDiv(left, right);
    return retDiv;
  }
}
