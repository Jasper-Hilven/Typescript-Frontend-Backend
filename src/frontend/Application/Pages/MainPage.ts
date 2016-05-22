/// <reference path="./index.ts" />

module frontend {
  export class MainPage implements IPageController {

    private container: HDiv;

    public constructor(
      private divLayout: DivLayout,
      private hFactory: HFactory,
      private navigator: Navigator,
      private footer: IHElement,
      private myApp: PayTogether,
      private proxy: BackendProxy,
      private title: string) {

      this.container = this.divLayout.CreateContainer();
      let newChipment = this.myApp.GetCreateChipment();
      let newChipmentUrl = this.myApp.GetNewChipmentURL();
      var newChipmentAction = ()=>{console.log("Exiting main to new");window.location.href = "/#"+NewChipmentPage.GetPName()+ "/"};
      let createNewChipmentButton = this.hFactory.GetParag(this.divLayout.GetButton(newChipment, newChipmentAction,"success"));
      let me = this;
      let jumbo = this.divLayout.CreateJumbotron(this.myApp.GetSlogan(), this.myApp.GetExplanation(), createNewChipmentButton);
      this.container.AddElement(navigator);
      this.container.AddElement(jumbo);
      this.container.AddElement(footer);
    }

    public GetName() {
      return "main";
    };

    public CanHandle(args: string[]): P.Promise<boolean> {
      return P.resolve<boolean>(true);
    }

    public Handle(args: string[]): P.Promise<boolean> {
      document.title = this.title;
      return P.resolve<boolean>(true);

    }

    public GetElement() {
      return this.container;
    }

  }
}
