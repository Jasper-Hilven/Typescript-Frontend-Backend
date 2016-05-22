module frontend {
  export class AboutPage implements IPageController {
    private container: HDiv;

    public constructor(
      private divLayout: DivLayout,
      private hFactory: HFactory,
      private navigator: Navigator, footer: IHElement,
      private title: string) {

      this.container = this.divLayout.CreateContainer();
      this.container.AddElement(navigator);
      let jumbo = this.divLayout.CreateJumbotron(
       "What is this about?",
       "In here we describe what this is all about", this.hFactory.GetText("Some explanations here would be rather appropriate") );
      this.container.AddElement(jumbo);
      this.container.AddElement(footer);
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
