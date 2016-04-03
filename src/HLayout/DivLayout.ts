import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
export class DivLayout {
  hFactory: HF;
  constructor(hFactory: HF) {
    this.hFactory = hFactory;
  }

  CreateContainer() {
    var containerDiv = this.hFactory.GetClassedDiv("container");
    containerDiv.element.style.maxWidth = "730px"
    return containerDiv;
  }

  CreateJumbotron(title, leadText) {
    var jumboDiv = this.hFactory.GetClassedDiv("jumbotron");
    jumboDiv.element.style.textAlign = "center"
    jumboDiv.element.style.borderBottom = "2px solid #e5e5e5"
    var titleTextElem = this.hFactory.GetText(title);
    var titleH1 = this.hFactory.GetH1(titleTextElem);
    jumboDiv.AddElement(titleH1);
    var leadTextElem = this.hFactory.GetText(leadText);
    var leadParam = this.hFactory.GetClassedParam("lead", leadTextElem);
    jumboDiv.AddElement(leadParam);
    return jumboDiv;
  }
}
