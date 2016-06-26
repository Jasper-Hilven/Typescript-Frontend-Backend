/// <reference path="./index.gen.ts" />
module frontend {

  export class NewChipmentPage implements IPageController {

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
      let createChipment = "Create a new chipment";
      let fillInChipment = "Fill in this form to create a new chipment.";
      let jumbo = this.divLayout.CreateJumbotron(createChipment, fillInChipment, hFactory.GetText(""));
      this.container.AddElement(navigator);
      this.container.AddElement(jumbo);
      let form = this.GetForm(formCreator);
      this.container.AddElement(form);
      this.container.AddElement(footer);
    }

    public GetName(): string {
      return "newchipment";
    }
    public static GetPName(): string {
      return "newchipment";
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

    private GetForm(formCreator: FormCreator) {
      let control = new FillFormInControl(this.navigator, this.backendProxy);
      let form = control.GetForm(formCreator, (d) => this.CreateNewChipment(d), () => this.CancelCreateNewChipment());
      form.Update();
      return form;
    }

    CreateNewChipment(data: { [id: string]: string; }) {
      let chipmentData = data;
      let author = new commonend.User(chipmentData[FillFormInControl.AuthorKey], chipmentData[FillFormInControl.AuthorEmail]);
      let name = chipmentData[FillFormInControl.NameKey];
      throw "minmaxpayment";
      let minPayment = 1;
      let maxPayment = 2;
let currency: string = chipmentData[FillFormInControl.Currency];
      let description: string = chipmentData[FillFormInControl.DescriptionKey];
      let chipment = new commonend.Chipment(author, name, minPayment, maxPayment, currency, description, <any>[]);
      this.backendProxy.CreateChipment(this.backendProxy.GetRanddomId(), "superkey", chipment)
        .then((c: any) => {
          console.log(c);
          console.log("registered changes");
          window.location.href = "#" + CreatedNewChipmentPage.GetPName() + "/" + c.id + "/" + c.userKey + "/" + c.authorKey;
        });
    }


    CancelCreateNewChipment() {
      window.location.href = "";
    }


  }
}
