/// <reference path="./index.gen.ts" />
module frontend {

  export class ExistingChipmentPageControllerAuthor implements IPageController {

    private container: HDiv;

    public constructor(
      private divLayout: DivLayout,
      private hFactory: HFactory,
      private navigator: Navigator,
      private footer: IHElement,
      private formCreator: FormCreator,
      private backendProxy: BackendProxy,
      private title: string) {

      this.container = this.divLayout.CreateContainer();
      let editChipment = "Change your chipment.";
      let jumbo = this.divLayout.CreateJumbotron(editChipment, "Change your existing chipment here.", hFactory.GetText(""));
      this.container.AddElement(navigator);
      this.container.AddElement(jumbo);
      let form = this.GetForm(formCreator);

      this.container.AddElement(form);
      this.container.AddElement(footer);
    }
    public static GetPName() {
      return "change_chipment";

    }
    public GetName(): string {
      return ExistingChipmentPageControllerAuthor.GetPName();
    };
    public CanHandle(args: string[]): P.Promise<boolean> {
      return P.resolve<boolean>(true);

    }
    public Handle(args: string[]): P.Promise<boolean> {
      document.title = "You created a new chipment";
      return P.resolve<boolean>(true);

    }

    public GetElement() {
      return this.container;
    }

    public GetForm(formCreator: FormCreator) {
      let control = new FillFormInControl(this.navigator, this.backendProxy);
      let form = control.GetForm(formCreator, (d) => { console.log("todo change chipment:" + d) }, () => { console.log("todo cancel change chipment:") });
      form.Update();
      return form;
    }
  }
}
