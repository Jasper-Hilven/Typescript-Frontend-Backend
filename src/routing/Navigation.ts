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
  constructor(hFactory: HF, navigationElements: NavigationElement[]) {
    this.navDiv = hFactory.GetClassedDiv("header clearfix");
    var elements = hFactory.GetClassedUl("nav nav-pills pull-right");
    this.navDiv.AddElement(elements);
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
