/// <reference path="./index.gen.ts" />

module frontend {
  export class PaymentText implements IFormElement {
   mainDiv: HDiv;
   constructor(private hf: HFactory){
    this.mainDiv = hf.GetDiv();
    this.mainDiv.AddElement(this.GetTextElement(""));
   }
   private GetTextElement(t){
    let span =this.hf.GetText(t);
    let h3 = this.hf.GetH3(span);
    h3.element.style.textAlign = "center";
    return h3;
   }
    GetVisualization(){
     return this.mainDiv;
    }
    static Name = "paymenttext";
    GetName(){
    return PaymentText.Name;
   }
    GetDefaultValue(){
     return"";
    }
    SetForm(form: HForm){
    }
    SetStatus(res: HFormStatus){
     console.log("setting status of payment text");
     this.mainDiv.RemoveAllChildren();
     this.mainDiv.AddElement(this.GetTextElement(res.Message));
    }
  }
}
