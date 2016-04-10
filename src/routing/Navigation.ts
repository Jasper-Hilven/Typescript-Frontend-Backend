import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
import HDivMod = require("../HBasics/HDiv");
import HDiv = HDivMod.HDiv;


export class NavigationElement {
  constructor(public text: string, public url: string) {
  }
}

export class Navigator implements IHEl {
  navDiv: HDiv;
  constructor(hFactory: HF, title: string, navigationElements: NavigationElement[]) {
    this.navDiv = hFactory.GetClassedDiv(["header", "clearfix"]);
    var nav = hFactory.GetNav();
    var elementsList = hFactory.GetClassedUl(["nav", "nav-pills", "pull-right"]);
    for (var i in navigationElements) {
      var navElem = navigationElements[i];
      console.log(navElem.text);
      var direct = hFactory.GetLi(hFactory.GetARef(hFactory.GetText(navElem.text), navElem.url));
      hFactory.SetRole(direct, "presentation");
      elementsList.AddElement(direct);
    }
    nav.AddElement(elementsList);
    this.navDiv.AddElement(nav);
    this.navDiv.AddElement(hFactory.GetH3(hFactory.GetText(title)));
  }
  /*<div class="header clearfix" >
    <nav>
    <ul class="nav nav-pills pull-right" >
    <li role="presentation" class="active" > <a href="#" > Home < /a></li >
    <li role="presentation" > <a href="#" > Contact < /a></li >
    </ul>
    < /nav>
    < h3 class="text-muted" > PayTogether < /h3>
    < /div>
*/
  GetElement(): HTMLElement {
    return this.navDiv.element;
  }
}
