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
    static Currency = "Currency";
    static AuthorKey = "Author";
    static AuthorEmail = "AuthorEmail";
    static Deadline = "Deadline";

    GetForm(formCreator: FormCreator, successAction, failAction) {
     ///Elements
        let cName= formCreator.CreateTextElement(FillFormInControl.NameKey, "What is the name of the chipment?", "",true);
        let whyCreate= formCreator.CreateTextElement(FillFormInControl.DescriptionKey, "Why are you creating this chipment?", "",true);
        let authName = formCreator.CreateTextElement(FillFormInControl.AuthorKey, "What is your name?", "",true);
        let authMail = formCreator.CreateTextElement(FillFormInControl.AuthorEmail, "What is your e-mail address?", "",true);
      let currency = formCreator.CreateSelectElement(FillFormInControl.Currency, "In Which Currency?", ["Euro","Dollar"]);
      let minmaxSlide = formCreator.CreateSliderElement(FillFormInControl.MinMaxPayment, "What is the contribution?", new HRangeSliderInfo(1, 50, 5, 10, 1));
      let paymentText=  new frontend.PaymentText(formCreator.GetHFactory());
        let deadline = formCreator.CreateDatePickerElement(FillFormInControl.Deadline, "What is the participants deadline to contribute?");

        let elements = [cName,authName,currency,whyCreate,authMail,minmaxSlide,deadline,paymentText];
    ////Visualization
    let cNameVis= cName.GetVisualization();
    let whyCreateVis = whyCreate.GetVisualization();
    let authNameVis = authName.GetVisualization();
    let authMailVis = authMail.GetVisualization();
    let minmaxSlideVis = minmaxSlide.GetVisualization();
    let currencyVis=currency.GetVisualization();
    let deadlineVis = deadline.GetVisualization();
    let paymentTextVis = paymentText.GetVisualization();
    let vElements = [cNameVis,whyCreateVis,authNameVis,minmaxSlideVis,currencyVis,deadlineVis,paymentTextVis];
      ////Hierarchy
        let info = formCreator.CreateLeftRightGroup(cNameVis,whyCreateVis);
        let author = formCreator.CreateLeftRightGroup(authNameVis,authMailVis);
        let payment = formCreator.CreateElementList([formCreator.CreateLeftRightGroup(minmaxSlideVis,currencyVis),paymentTextVis]);
        let rootElement = formCreator.CreateElementList([info,author,payment,deadlineVis]);
       ///Style
        vElements.map(vE => formCreator.SetBorderAround(vE,"5"));
        [info,author,payment,deadlineVis].map(vE => formCreator.SetBorderAround(vE,"2"))
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
      let minmaxpayment = chipmentData[FillFormInControl.MinMaxPayment].split(",");
      let minPayment = +(minmaxpayment[0]);
      let maxPayment = +(minmaxpayment[1]);
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
      this.HandleCurrencyPaymentText(currency,MinMaxPayment,ret);
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
    HandleCurrencyPaymentText(currency, payment, ret){
        let pays = payment.split(",");
        let minPay = pays[0];
        let maxPay = pays[1];

        ret[PaymentText.Name] = new HFormStatus(HFormStatusType.OK,"Each contributor pays between " + minPay + " and "+ maxPay + " " + currency+ ".");
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
