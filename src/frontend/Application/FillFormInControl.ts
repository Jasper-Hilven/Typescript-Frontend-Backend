import {Chipment, User} from "../../backend/ChipinModel";
import {HForm} from "../HComposed/Forms/HForm";
import {BackendProxy} from "./BackendProxy";
import {FormCreator} from "../HComposed/Forms/FormCreator";
import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import ICheckFunctionModule = require("../HComposed/Forms/ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFormStatusModule = require("../HComposed/Forms/HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController; import RouteObserver = R.RouteObserver;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;


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
    GetForm(formCreator: FormCreator) {
        var rows = [
            formCreator.CreateTextElement(FillFormInControl.NameKey, "Name", ""),
            formCreator.CreateTextElement(FillFormInControl.DescriptionKey, "Description", ""),
            formCreator.CreateTextElement(FillFormInControl.Currency, "Currency", "Euro"),
            formCreator.CreateTextElement(FillFormInControl.MinimumPayment, "Minimum Payment", ""),
            formCreator.CreateTextElement(FillFormInControl.MaximumPayment, "Maximum Payment", ""),
            // FormCreator.CreateTextElement("ChipinEmailRequired", "Contributor email adress", "")
            formCreator.CreateTextElement(FillFormInControl.AuthorKey, "Author", ""),
            formCreator.CreateTextElement(FillFormInControl.AuthorEmail, "Author Email", "")];

        var form = formCreator.CreateForm(rows, this,()=> this.CreateNewChipment(), this.CancelCreateNewChipment);
        console.log("Created form",form);
        this.form = form;
        console.log("Stored form",this.form);
        return form;

    }
    GetStoredForm(){
      return this.form;
    }
    CreateNewChipment() {
        var chipmentData = this.GetStoredForm().GetLatestValues();
        var author = new User(chipmentData[FillFormInControl.AuthorKey], chipmentData[FillFormInControl.AuthorEmail]);
        var name = chipmentData[FillFormInControl.NameKey];
        var minPayment: number = Number(chipmentData[FillFormInControl.MinimumPayment]);
        var maxPayment: number = Number(chipmentData[FillFormInControl.MaximumPayment]);
        var currency: string = chipmentData[FillFormInControl.Currency];
        var description: string = chipmentData[FillFormInControl.DescriptionKey];
        var chipment = new Chipment(author, name, minPayment, maxPayment, currency, description, <any>[]);
        this.backendProxy.CreateChipment(this.backendProxy.GetRanddomId(), "superkey", chipment,()=>{console.log("Goood")},()=>{console.log("Baaaad")});
        console.log("creation of chipment is triggered in fillformincontrol");
    }
    CancelCreateNewChipment() {
        window.location.href = "";
    }


    CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
        console.log("entered checkValues");
        console.log(input);
        var authorText = input[FillFormInControl.AuthorKey];
        var descriptionText = input[FillFormInControl.DescriptionKey];
        var currency = input[FillFormInControl.Currency];
        var minimumPayment = input[FillFormInControl.MinimumPayment];
        var maximumPayment = input[FillFormInControl.MaximumPayment];
        var name = input[FillFormInControl.NameKey];
        var email = input[FillFormInControl.AuthorEmail];
        // Public StatusType: HFormStatusType, public Message: string
        var ret: { [id: string]: HFormStatus; } = {};
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
        var trimmedLower = currency.trim().toLowerCase();
        var known = ["euro", "dollar"];
        if (known.indexOf(trimmedLower) < 0) {
            ret[FillFormInControl.Currency] = new HFormStatus(HFormStatusType.Warning, "Currency is not Euro or Dollar");
            return;
        }
        ret[FillFormInControl.Currency] = new HFormStatus(HFormStatusType.OK, "We have euros or dollars");

    }

    HandlePayments(minimumPayment: string, maximumPayment: string, ret) {
        var minPayNumb = Number(minimumPayment);
        var maxPayNumb = Number(maximumPayment);
        var valid = new HFormStatus(HFormStatusType.OK, "This is a valid amount.");
        var invalid = new HFormStatus(HFormStatusType.Error, "A valid amount must be provided.");
        var invalidEmpty = new HFormStatus(HFormStatusType.Error, "The amount cannot be empty.");
        var invalidPasMax = new HFormStatus(HFormStatusType.Error, "The minimum amount can not be smaller than the maximum amount.");
        var invalidSeparator = new HFormStatus(HFormStatusType.Error, "Use a '.' as separator instead of ','")
        ret[FillFormInControl.MinimumPayment] = valid;
        ret[FillFormInControl.MaximumPayment] = valid;
        var minNumberinValid = isNaN(minPayNumb);
        var maxNumberinValid = isNaN(maxPayNumb);
        var allNumberValid = (!minNumberinValid) && (!maxNumberinValid);
        if (minNumberinValid)
        { ret[FillFormInControl.MinimumPayment] = invalid; }
        if (maxNumberinValid)
        { ret[FillFormInControl.MaximumPayment] = invalid; }
        if (allNumberValid && minPayNumb > maxPayNumb) {
            ret[FillFormInControl.MinimumPayment] = invalidPasMax;
            ret[FillFormInControl.MaximumPayment] = invalidPasMax;
        }
        var trimmedMinPayment = minimumPayment.trim();
        var trimmedMaxPayment = maximumPayment.trim();
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
