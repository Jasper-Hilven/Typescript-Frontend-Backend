/* tslint:disable */
/// <reference path="./index.ts" />
module frontend {
  export class CreatedNewChipmentPage implements IPageController {

    private currentChipment: commonend.Chipment;
    private container: HDiv;

    constructor(
      private divLayout: DivLayout,
      private hFactory: HFactory,
      private navigator: Navigator,private footer: IHElement,
      private backendProxy: BackendProxy,
      private title: string) {


    }

    public SetActive(): P.Promise<boolean> {
      document.title = "Created new chipment";
      return P.resolve(true);
    }
    public GetName():string{
     return CreatedNewChipmentPage.GetPName();
    };
    public static GetPName() {
      return "creatednewchipment";
    };
    public CanHandle(args: string[]) {
      return P.resolve<boolean>(true);
    };
    Handle(args: string[]): P.Promise<boolean> {
       let id = args[0];
       let userKey = args[1];
       let authorKey = args[2];

       this.container = this.divLayout.CreateContainer();
       this.container.AddElement(this.navigator);
       let createChipment = "You created a new chipment!";
       let friendLink = "https://chipmentfrontend.herokuapp.com//#" + "chipin_with" + "/" + id + "/" + userKey;
       let privateLink = "https://chipmentfrontend.herokuapp.com//#" + "chipin_with" + "/" + id + "/" + authorKey;
let sendFriends = "Send the following link to your friends so they can chipin: " + friendLink;
       let keepPrivate = "Keep the following link for yourself to edit the chipment later: "+ privateLink;
       let jumbo = this.divLayout.CreateJumbotron(createChipment,"", this.hFactory.GetText(sendFriends+"\r\n"+"\r\n"+ keepPrivate) );
       this.container.AddElement(jumbo);
       this.container.AddElement(this.footer);
       return P.resolve(true);
    }
    public GetElement() {
      return this.container;
    }
  }
}
