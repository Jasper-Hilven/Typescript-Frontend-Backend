/* tslint:disable */
module frontend {
  export class NavigationElement {
    constructor(public text: string, public url: string) {
    }
  }

  export class Navigator implements IHElement {
    navDiv: HDiv;
    constructor(hFactory: HFactory, title: string, navigationElements: NavigationElement[]) {
      this.navDiv = hFactory.GetClassedDiv(["header", "clearfix"]);
      let nav = hFactory.GetNav();
      let elementsList = hFactory.GetClassedUl(["nav", "nav-pills", "pull-right"]);
      for (let i in navigationElements) {
        let navElem = navigationElements[i];
        console.log(navElem.text);
        let direct = hFactory.GetLi(hFactory.GetARef(hFactory.GetText(navElem.text), navElem.url));
        hFactory.SetRole(direct, "presentation");
        elementsList.AddElement(direct);
      }
      nav.AddElement(elementsList);
      this.navDiv.AddElement(nav);
      this.navDiv.AddElement(hFactory.GetH3(hFactory.GetText(title)));
    }
    GetElement(): HTMLElement {
      return this.navDiv.element;
    }
  }
}
