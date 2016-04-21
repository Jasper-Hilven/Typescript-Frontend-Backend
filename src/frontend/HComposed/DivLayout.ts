import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
export class DivLayout {
  hFactory: HF;
  constructor(hFactory: HF) {
    this.hFactory = hFactory;
    var a = 0;
  }

  CreateContainer() {
    var containerDiv = this.hFactory.GetClassedDiv(["container"]);
    containerDiv.element.style.maxWidth = "1250px";
    return containerDiv;
  }

  CreateJumbotron(title, leadText, thirdChild) {
    var jumboDiv = this.hFactory.GetClassedDiv(["jumbotron"]);
    // JumboDiv.element.style.textAlign = "center"
    jumboDiv.element.style.borderBottom = "2px solid #e5e5e5"
    var titleTextElem = this.hFactory.GetText(title);
    var titleH1 = this.hFactory.GetH1(titleTextElem);
    jumboDiv.AddElement(titleH1);
    var leadTextElem = this.hFactory.GetText(leadText);
    var leadParam = this.hFactory.GetClassedParag(["lead"], leadTextElem);
    jumboDiv.AddElement(leadParam);
    if (thirdChild == undefined)
    { return; }
    jumboDiv.AddElement(thirdChild);
    return jumboDiv;
  }

  GetLeftRightFlexDiv(leftElem, rightElem) {
    var parentDiv = this.hFactory.GetDiv();
    var style = parentDiv.element.style;
    style.display = "flex";
    style.flexDirection = "row";
    style.flexWrap = "nowrap";
    style.justifyContent = "center";
    style.alignItems = "center"
    parentDiv.AddElement(leftElem);
    parentDiv.AddElement(rightElem);
    return parentDiv;
  }
  GetUpDownFlexDiv(upElem, downElem) {
    var parentDiv = this.hFactory.GetDiv();
    var style = parentDiv.element.style;
    style.display = "flex";
    style.flexDirection = "column";
    style.flexWrap = "nowrap";
    style.justifyContent = "center";
    style.alignItems = "center";
    style.margin = "4";
    parentDiv.AddElement(upElem);
    parentDiv.AddElement(downElem);
    return parentDiv;
  }

  GetGoodButton(text: string, ref: string) {
    var ret = this.hFactory.GetARef(this.hFactory.GetText(text), ref);
    this.hFactory.SetRole(ret, "button");
    this.hFactory.AddClasses(ret, ["btn", "btn-lg", "btn-success"]);
    return ret;
  }
  GetFooter(text) {
    var hFactory = this.hFactory;
    var footer = hFactory.GetDivWithChild(hFactory.GetClassedFooter(["footer"], hFactory.GetParag(hFactory.GetText(text))));
    var style = footer.GetElement().style;
    style.marginTop = "42px";
    style.marginLeft = "10px";
    return footer;
  }


}
