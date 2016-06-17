/// <reference path="./index.gen.ts" />

module frontend{
 export class ExistingChipmentFormFactory{
  public constructor(private hFactory: HFactory,private divLayout: DivLayout,private formCreator: FormCreator){

  }
  public static FormIdName = "name";
  public static FormIdEmail = "email";
  public static FormIdAmount = "amount";
  public GetExistingChipmentForm(minValue:number, maxValue:number,authorName: string, triggerFunction: any,cancelFunction: any): HForm{
  let elements = this.GetElements(authorName);
  let checkFunction = new ExistingChipmentFormCheckFunction(minValue,maxValue);
   return this.formCreator.CreateForm(elements, checkFunction, triggerFunction, cancelFunction);

  }
  private GetElements(authorName: string):HFormTextElement[]{
    return [];
    /*formCreator. new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdName,"What is your name?",""),
    new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdEmail,"On which e-mail address can " + authorName + " reach you?",""),
  new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdAmount,"How much do you want to chip in?","")];
  */}
 }
 export class ExistingChipmentFormCheckFunction implements frontend.ICheckFunction{
    public constructor(private minValue:number,private maxValue:number){
    }
    public CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; }{
     let name = input[ExistingChipmentFormFactory.FormIdName];
     let mail = input[ExistingChipmentFormFactory.FormIdEmail];
     let amount = input[ExistingChipmentFormFactory.FormIdAmount];
     let ret: { [id: string]: HFormStatus; } = {};
     ret[ExistingChipmentFormFactory.FormIdName] = name.trim().length > 0 ?
       new HFormStatus(HFormStatusType.OK, "This is a valid name."):
       new HFormStatus(HFormStatusType.Error, "Name cannot be empty");
       ret[ExistingChipmentFormFactory.FormIdEmail] = mail.trim().length > 0 ?
         new HFormStatus(HFormStatusType.OK, "This is a valid email.") :
         new HFormStatus(HFormStatusType.Error, "email cannot be empty");
     var validNumber = (Number(amount) != Number.NaN) && Number(amount) >= this.minValue && Number(amount) <= this.maxValue;
     ret[ExistingChipmentFormFactory.FormIdAmount] = validNumber ?
       new HFormStatus(HFormStatusType.OK, "This is a valid amount.") :
       new HFormStatus(HFormStatusType.Error, "Amount must be bigger then " + this.minValue + " and smaller then " + this.maxValue);
       return ret;
    }
 }
}
