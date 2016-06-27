module frontend {
  export class AboutPage implements IPageController {
    private container: HDiv;

    public constructor(
      private divLayout: DivLayout,
      private hFactory: HFactory,
      private navigator: ()=>Navigator, footer: ()=>IHElement,
      private title: string) {
      this.container = this.divLayout.CreateContainer();
      this.container.AddElement(navigator());
      let longText = "Create a new gift here and provide some basic information about the gift." + "Each person chipping in can indicate that they paid, you just need to confirm that they did." + "For the ones that didn’t pay yet, we will take care of sending the reminders. " + "\r\n \r\nSimple as that!";
      let easyEveryone = "PayTogether has the goal to make gift-giving with a group easier for everyone:\r\n";
      let forwho = " - For the person coordinating the gift \r\n - For the person chipping in";
      let jumbo = this.divLayout.CreateJumbotron("PayTogether", easyEveryone + forwho + longText, undefined);
      this.container.AddElement(jumbo);
      this.container.AddElement(footer());
    }

    public SetActive(id: string, key: string) {
      document.title = this.title;
    }

    public GetName() {
      return "about";
    };
    public CanHandle(args: string[]) {
      return P.resolve(true);
    };
    Handle(args: string[]): P.Promise<boolean> {
      return P.resolve(true);
    }
    public GetElement() {
      return this.container;
    }

  }
}
