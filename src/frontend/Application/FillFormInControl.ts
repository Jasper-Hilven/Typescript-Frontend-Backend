/* tslint:disable */
/// <reference path="./index.gen.ts" />
//type successFunction = ({[id:string]}:string)=>void;

module frontend {

  export class FillFormInControl implements ICheckFunction {

    private form: HForm;

    constructor(private navigation: Navigator, private backendProxy: BackendProxy) {

    }
    static NameKey = "Name";
    static DescriptionKey = "Description";
    static MinMaxPayment = "MinMaxPayment";
    static MinPayment = "MinPayment";
    static MaxPayment = "MaxPayment";
    static Currency = "Currency";
    static AuthorKey = "Author";
    static AuthorEmail = "AuthorEmail";
    static Deadline = "Deadline";

    GetForm(formCreator: FormCreator, successAction, failAction) {

        let cName= formCreator.CreateTextElement(FillFormInControl.NameKey, "What is the name of the chipment?", "",true);
        let whyCreate= formCreator.CreateTextElement(FillFormInControl.DescriptionKey, "Why are you creating this chipment?", "",false);
        let authName = formCreator.CreateTextElement(FillFormInControl.AuthorKey, "What is your name?", "",true);
        let authMail = formCreator.CreateTextElement(FillFormInControl.AuthorEmail, "What is your e-mail address", "",true);
      let currency = formCreator.CreateSelectElement(FillFormInControl.Currency, "Which currency are you using?", ["Euro","Dollar"]);
        let minmaxSlide = formCreator.CreateSliderElement(FillFormInControl.MinMaxPayment, "What is the contribution?", new HRangeSliderInfo(1, 50, 5, 10, 1));
        let deadline = formCreator.CreateDatePickerElement(FillFormInControl.Deadline, "What is the deadline for the participants if they want to chip in?");
      let right = [currency,minmaxSlide,deadline];
      let left = [cName,whyCreate,authName,authMail];
      let elements = right.concat(left);
      let rootElement = formCreator.CreateLeftRightSplitElement(left,right);

      let form = formCreator.CreateForm(
         rootElement,
        elements,
        this,
        () => successAction(this.GetStoredForm().GetLatestValues()),
        () => failAction(this.GetStoredForm().GetLatestValues()));
      console.log("Created form", form);
      this.form = form;
      console.log("Stored form", this.form);
      return form;

    }
    GetStoredForm() {
      return this.form;
    }
    CreateNewChipment() {
      let chipmentData = this.GetStoredForm().GetLatestValues();
      let author = new commonend.User(chipmentData[FillFormInControl.AuthorKey], chipmentData[FillFormInControl.AuthorEmail]);
      let name = chipmentData[FillFormInControl.NameKey];
      throw "minmaxpayment";
      let minPayment = 1;
      let maxPayment = 2;

      let currency: string = chipmentData[FillFormInControl.Currency];
      let description: string = chipmentData[FillFormInControl.DescriptionKey];
      let chipment = new commonend.Chipment(author, name, minPayment, maxPayment, currency, description, <any>[]);
      this.backendProxy.CreateChipment(this.backendProxy.GetRanddomId(), "superkey", chipment)
        .then((c: any) => { console.log(c); });
    }

    CancelCreateNewChipment() {
      window.location.href = "";
    }


    CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
      console.log("entered checkValues");
      console.log(input);
      let authorText = input[FillFormInControl.AuthorKey];
      let descriptionText = input[FillFormInControl.DescriptionKey];
      let currency = input[FillFormInControl.Currency];
      let MinMaxPayment = input[FillFormInControl.MinMaxPayment];
      let name = input[FillFormInControl.NameKey];
      let email = input[FillFormInControl.AuthorEmail];
      let ret: { [id: string]: HFormStatus; } = {};
      this.HandleAuthorInput(authorText, ret);
      this.HandleAuthorEmail(email, ret);
      this.HandleDescriptionInput(descriptionText, ret);
      this.HandleCurrency(currency, ret);
      this.HandlePayments(MinMaxPayment, ret);
      this.HandleNameInput(name, ret);
      return ret;
    }

    HandleAuthorInput(authorText, ret) {
      if (authorText.length == 0)
      { ret[FillFormInControl.AuthorKey] = new HFormStatus(HFormStatusType.Error, "Author name is not allowed to be empty"); }
      else
      { ret[FillFormInControl.AuthorKey] = new HFormStatus(HFormStatusType.OK, "Author name is filled in"); }
    }

    HandleAuthorEmail(authorText, ret) {
      if (authorText.length == 0)
      { ret[FillFormInControl.AuthorEmail] = new HFormStatus(HFormStatusType.Error, "Author email is not allowed to be empty"); }
      else
      { ret[FillFormInControl.AuthorEmail] = new HFormStatus(HFormStatusType.OK, "Author email is filled in"); }
    }

    HandleDescriptionInput(text, ret) {
      if (text.length == 0)
      { ret[FillFormInControl.DescriptionKey] = new HFormStatus(HFormStatusType.Warning, "Discription should not be empty"); }
      else
      { ret[FillFormInControl.DescriptionKey] = new HFormStatus(HFormStatusType.OK, "Description is filled in"); }
    }

    HandleNameInput(text, ret) {
      if (text.length == 0)
      { ret[FillFormInControl.NameKey] = new HFormStatus(HFormStatusType.Error, "Name is not allowed to be empty"); }
      else
      { ret[FillFormInControl.NameKey] = new HFormStatus(HFormStatusType.OK, "Name is filled in"); }
    }

    HandleCurrency(currency: string, ret) {
      let trimmedLower = currency.trim().toLowerCase();
      let known = ["euro", "dollar"];
      if (known.indexOf(trimmedLower) < 0) {
        ret[FillFormInControl.Currency] = new HFormStatus(HFormStatusType.Warning, "Currency is not Euro or Dollar");
        return;
      }
      ret[FillFormInControl.Currency] = new HFormStatus(HFormStatusType.OK, "We have euros or dollars");

    }

    HandlePayments(MinMaxPayment: string, ret) {
      let validMax = new HFormStatus(HFormStatusType.OK, ""+MinMaxPayment);
      ret[FillFormInControl.MinMaxPayment] = validMax;
     }

  }
}
