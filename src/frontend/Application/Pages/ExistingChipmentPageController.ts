/* tslint:disable */
/// <reference path="./index.ts" />
module frontend {
    export class ExistingChipmentPageController implements IPageController {

        private currentChipment: commonend.Chipment;
        private chipmentId: string;
        private chipmentKey:string;
        private container: HDiv;
        private enteringNewChipin: boolean;
        private enteringNewChipinForm:HForm;
        constructor(
            private divLayout: DivLayout,
            private hFactory: HFactory,
            private navigator: () => Navigator, private footer: () => IHElement,
            private backendProxy: BackendProxy, private formCreator: FormCreator,
            private title: string) {
            this.container = this.divLayout.CreateContainer();
        }
        BuildChipinList(): IHElement {
            var chipins = this.currentChipment.chipins;
            var chipinList = this.hFactory.GetUl();
            for (let i in chipins) {
                let chipin = chipins[i];
                let sentence = chipin.user.name + " (" + chipin.user.email + ")  chipped in with " + chipin.amount + " " + this.currentChipment.currency + ".";
                let deleteButton = this.divLayout;
                chipinList.AddElement(this.hFactory.GetLi(this.hFactory.GetText(sentence)));
            }
            return chipinList;
        }

        BuildContainer() {
            this.container.RemoveAllChildren();
            this.container.AddElement(this.navigator());
            let authorName = this.currentChipment.author.name;
            let eventName = this.currentChipment.name;
            let chipinWith = "Chipin for " + eventName;
            let moneyRange = this.currentChipment.minContribution + " and " + this.currentChipment.maxContribution;
            let togetherWith = authorName + " wants you to chipin between " + moneyRange + " " + this.currentChipment.currency + ".";

            let jumbo = this.divLayout.CreateJumbotron(chipinWith, togetherWith, this.hFactory.GetText(this.currentChipment.description));
            this.container.AddElement(jumbo);
            this.container.AddElement(this.BuildChipinList());
            var me = this;
            console.log("enteringNewChipin is: " + this.enteringNewChipin);
            var enableEnterAction = () => { this.enteringNewChipin = true; me.BuildContainer(); };
            var disableEnterAction = () => { this.enteringNewChipin = false; me.BuildContainer(); };
            var AddChipinAction = (c) =>
            {
             console.log("AddChipinAction");
             let latest = me.enteringNewChipinForm.GetLatestValues();
             let user = new commonend.User(latest["name"], latest["email"]);
             let amount = Number(latest["amount"]);
             me.backendProxy.AddChipin(me.chipmentId,me.chipmentKey,new commonend.Chipin(user,amount)).then(
              ()=>{
               console.log("redirecting after fill in");
              me.enteringNewChipin = false;
             window.location.href = "/#"+me.GetName() + "/"+me.chipmentId+"/"+me.chipmentKey+"/";
             location.reload();
             }
            );
             };
            if (this.enteringNewChipin) {
                var fact = new ExistingChipmentFormFactory(this.hFactory, this.divLayout, this.formCreator);
                let trigger = () => { console.log("triggered new chipin") };

                var form: HForm = fact.GetExistingChipmentForm(
                 this.currentChipment.minContribution,
                 this.currentChipment.maxContribution,
                 this.currentChipment.author.name ,
                 AddChipinAction,
                 disableEnterAction);

                this.enteringNewChipinForm = form;
                this.container.AddElement(form);
            }
            else {
                this.container.AddElement(this.divLayout.GetButton(chipinWith, enableEnterAction, "success"));
            }
            this.container.AddElement(this.footer());
        }

        public SetActive(id: string, key: string): P.Promise<boolean> {
            document.title = "existing chipment";
            var me = this;
            this.enteringNewChipin = false;
            return this.backendProxy.GetChipmentAsUser(id, key)
                .then<boolean>(c => { console.log("got chipment"); console.log(c); me.currentChipment = c; me.BuildContainer(); return true; })
        }

        public static GetPName() {
            return "chipin_with";
        }

        public GetName() {
            return ExistingChipmentPageController.GetPName();
        }
        public CanHandle(args: string[]) {
            return P.resolve<boolean>(true);
        }
        Handle(args: string[]): P.Promise<boolean> {
            let id = args[0];
            let key = args[1];
            this.chipmentId = id;
            this.chipmentKey = key;
            return this.SetActive(id, key);
        }

        public GetElement() {
            return this.container;
        }
    }
}
