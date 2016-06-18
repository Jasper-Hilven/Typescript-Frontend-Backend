/// <reference path="./index.gen.ts" />

module frontend {
  export class PageSelector implements frontend.IRouteObserver {
    private mainContent: HTMLElement;
    private currentPage: IPageController;

    public constructor(
      private routeController: RouteController,
      private pages: [IPageController],
      private defaultPage: IPageController) {
      this.mainContent = document.getElementById("maincontent");
      if(this.mainContent == null)
        throw "has no mainContent";
      routeController.AddLocationChangedEventListener(this);
    }
    public Initialize() {
      let path = this.routeController.GetParts();
      this.LoadPageViaPath(path);
    }
    public LocationChanged(oldParts: string[], newParts: string[]) {
      this.LoadPageViaPath(newParts);
    }

    private LoadPageViaPath(path: string[]): P.Promise<any> {
      console.log("changing with path", path);
      var me = this;
      let page = path.length > 0 ?
        this.pages.filter((p: IPageController) => p.GetName() === path[0]).concat([this.defaultPage])[0] :
        this.defaultPage;
      console.log("changing with page", page);
      return page.Handle(path.slice(1)).then(() => {
        me.SetupPage(page);
      });
    }

    private RemovePageChild() {
      console.log("removing", this.mainContent.children.length);
      while (this.mainContent.children.length > 0) {
        this.mainContent.removeChild(this.mainContent.children[0]);
      }
      console.log("removed", this.mainContent.children.length);
    }
    private SetupPage(page: IPageController) {
      if (page === this.currentPage)
        return;
      this.RemovePageChild();
      this.currentPage = page;
      this.mainContent.appendChild(page.GetElement().GetElement());
    }

  }
}
