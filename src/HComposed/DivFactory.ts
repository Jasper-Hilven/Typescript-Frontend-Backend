import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
export class DivFactory {
  factory: HF;
  public constructor(hFactory) {
    this.factory = hFactory;
  }

  GetLeftRightFlexDiv(leftElem, rightElem) {
    var parentDiv = this.factory.GetDiv();
    var style = parentDiv.element.style;
    style.display = "flex";
    style.flexDirection = "row";
    style.flexWrap = "nowrap";
    style.justifyContent = "space-between";
    parentDiv.AddElement(leftElem);
    parentDiv.AddElement(rightElem);
    return parentDiv;
  }

}
