/// <reference path="./index.ts" />

module frontend{
 export class ExistingChipmentFormFactory{
  public constructor(private hFactory: HFactory,private divLayout: DivLayout,private formCreator: FormCreator){

  }
  public static FormIdName = "name";
  public static FormIdEmail = "email";
  public static FormIdAmount = "amount";
  public GetExistingChipmentForm(minValue:number, maxValue:number, triggerFunction: any,cancelFunction: any): HForm{
  let elements = this.GetElements();
  let checkFunction = new ExistingChipmentFormCheckFunction(minValue,maxValue);
   return this.formCreator.CreateForm(elements, checkFunction, triggerFunction, cancelFunction);

  }
  private GetElements():HFormTextElement[]{
    return [new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdName,"Name",""),
    new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdEmail,"EmailAddress",""),
  new HFormTextElement(this.hFactory,this.divLayout,ExistingChipmentFormFactory.FormIdAmount,"Amount","")];
  }
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
