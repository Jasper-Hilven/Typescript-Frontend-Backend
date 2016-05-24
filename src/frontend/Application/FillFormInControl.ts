/* tslint:disable */
/// <reference path="./index.ts" />
//type successFunction = ({[id:string]}:string)=>void;

module frontend {

  export class FillFormInControl implements ICheckFunction {

    private form: HForm;

    constructor(private navigation: Navigator, private backendProxy: BackendProxy) {

    }
    static NameKey = "Name";
    static DescriptionKey = "Description";
    static MinimumPayment = "MinimumPayment";
    static MaximumPayment = "MaximumPayment";
    static Currency = "Currency";
    static AuthorKey = "Author";
    static AuthorEmail = "AuthorEmail";
    static Deadline = "Deadline";

    GetForm(formCreator: FormCreator,successAction,failAction ) {
      let rows = [
        formCreator.CreateTextElement(FillFormInControl.NameKey, "What is the name of the chipment?", ""),
        formCreator.CreateTextElement(FillFormInControl.DescriptionKey, "Why are you creating this chipment?", ""),
        formCreator.CreateTextElement(FillFormInControl.Currency, "Which currency are you using?", "Euro"),
        formCreator.CreateTextElement(FillFormInControl.MinimumPayment, "What is the minimum contribution?", ""),
        formCreator.CreateTextElement(FillFormInControl.MaximumPayment, "What is the maximum contribution?", ""),
        formCreator.CreateTextElement(FillFormInControl.AuthorKey, "What is your name?", ""),
        formCreator.CreateTextElement(FillFormInControl.AuthorEmail, "What is your e-mail address", ""),
        formCreator.CreateTextElement(FillFormInControl.Deadline, "What is the deadline for the participants if they want to chip in?", "")];
       //formCreator.CreateTextElement(FillFormInControl.ReminderFrequency, "How often do you want to send reminders?", "")];

      let form = formCreator.CreateForm(
       rows,
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
      let minPayment: number = Number(chipmentData[FillFormInControl.MinimumPayment]);
      let maxPayment: number = Number(chipmentData[FillFormInControl.MaximumPayment]);
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
      let minimumPayment = input[FillFormInControl.MinimumPayment];
      let maximumPayment = input[FillFormInControl.MaximumPayment];
      let name = input[FillFormInControl.NameKey];
      let email = input[FillFormInControl.AuthorEmail];
      // Public StatusType: HFormStatusType, public Message: string
      let ret: { [id: string]: HFormStatus; } = {};
      this.HandleAuthorInput(authorText, ret);
      this.HandleAuthorEmail(email, ret);
      this.HandleDescriptionInput(descriptionText, ret);
      this.HandleCurrency(currency, ret);
      this.HandlePayments(minimumPayment, maximumPayment, ret);
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

    HandlePayments(minimumPayment: string, maximumPayment: string, ret) {
      let minPayNumb = Number(minimumPayment);
      let maxPayNumb = Number(maximumPayment);
      let valid = new HFormStatus(HFormStatusType.OK, "This is a valid amount.");
      let invalid = new HFormStatus(HFormStatusType.Error, "A valid amount must be provided.");
      let invalidEmpty = new HFormStatus(HFormStatusType.Error, "The amount cannot be empty.");
      let invalidPasMax = new HFormStatus(HFormStatusType.Error, "The minimum amount can not be smaller than the maximum amount.");
      let invalidSeparator = new HFormStatus(HFormStatusType.Error, "Use a '.' as separator instead of ','")
      ret[FillFormInControl.MinimumPayment] = valid;
      ret[FillFormInControl.MaximumPayment] = valid;
      let minNumberinValid = isNaN(minPayNumb);
      let maxNumberinValid = isNaN(maxPayNumb);
      let allNumberValid = (!minNumberinValid) && (!maxNumberinValid);
      if (minNumberinValid)
      { ret[FillFormInControl.MinimumPayment] = invalid; }
      if (maxNumberinValid)
      { ret[FillFormInControl.MaximumPayment] = invalid; }
      if (allNumberValid && minPayNumb > maxPayNumb) {
        ret[FillFormInControl.MinimumPayment] = invalidPasMax;
        ret[FillFormInControl.MaximumPayment] = invalidPasMax;
      }
      let trimmedMinPayment = minimumPayment.trim();
      let trimmedMaxPayment = maximumPayment.trim();
      if (trimmedMinPayment.length == 0) {
        ret[FillFormInControl.MinimumPayment] = invalidEmpty;
      }
      if (trimmedMaxPayment.length == 0)
      { ret[FillFormInControl.MaximumPayment] = invalidEmpty; }
      if (trimmedMinPayment.indexOf(",") >= 0)
      { ret[FillFormInControl.MinimumPayment] = invalidSeparator; }
      if (trimmedMaxPayment.indexOf(",") >= 0)
      { ret[FillFormInControl.MaximumPayment] = invalidSeparator; }
    }

  }
}
