/// <reference path="./index.gen.ts" />

module frontend {
    export class ExistingChipmentFormFactory {
        public constructor(private hFactory: HFactory, private divLayout: DivLayout, private formCreator: FormCreator) {

        }
        public static FormIdName = "name";
        public static FormIdEmail = "email";
        public static FormIdAmount = "amount";
        public GetExistingChipmentForm(minValue: number, maxValue: number, authorName: string, triggerFunction: any, cancelFunction: any): HForm {
            let elements = this.GetElements(authorName);
            let visElements= elements.map(e => e.GetVisualization());
            visElements.map(vE => this.formCreator.SetBorderAround(vE,4));
            let rootElement = this.formCreator. CreateElementList(visElements);
            this.formCreator.SetBorderAround(rootElement,6);
            let checkFunction = new ExistingChipmentFormCheckFunction(minValue, maxValue);
            return this.formCreator.CreateForm(rootElement,elements, checkFunction, triggerFunction, cancelFunction);
        }
        private GetElements(authorName: string): IFormElement[] {
         let nameTag= this.formCreator.CreateTextElement(ExistingChipmentFormFactory.FormIdName, "What is your name?","",true);
         let emailTag = this.formCreator.CreateTextElement(ExistingChipmentFormFactory.FormIdEmail, "On which e-mail address can " + authorName + " reach you?","",true);
         let HowMuch = this.formCreator.CreateTextElement(ExistingChipmentFormFactory.FormIdAmount, "How much do you want to chip in?","",true);
         return [nameTag,emailTag,HowMuch];
               }
    }
    export class ExistingChipmentFormCheckFunction implements frontend.ICheckFunction {
        public constructor(private minValue: number, private maxValue: number) {
        }
        public CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
            let name = input[ExistingChipmentFormFactory.FormIdName];
            let mail = input[ExistingChipmentFormFactory.FormIdEmail];
            let amount = input[ExistingChipmentFormFactory.FormIdAmount];
            let ret: { [id: string]: HFormStatus; } = {};
            ret[ExistingChipmentFormFactory.FormIdName] = (name && name.trim().length > 0) ?
                new HFormStatus(HFormStatusType.OK, "This is a valid name.") :
                new HFormStatus(HFormStatusType.Error, "Name cannot be empty");
            ret[ExistingChipmentFormFactory.FormIdEmail] = (mail && mail.trim().length > 0) ?
                new HFormStatus(HFormStatusType.OK, "This is a valid email.") :
                new HFormStatus(HFormStatusType.Error, "email cannot be empty");
            var validNumber = amount && ( Number(amount) != Number.NaN) && Number(amount) >= this.minValue && Number(amount) <= this.maxValue;
            ret[ExistingChipmentFormFactory.FormIdAmount] = validNumber ?
                new HFormStatus(HFormStatusType.OK, "This is a valid amount.") :
                new HFormStatus(HFormStatusType.Error, "Amount must be bigger then " + this.minValue + " and smaller then " + this.maxValue);
            return ret;
        }
    }
}
