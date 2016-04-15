//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import Dv = require("../HBasics/HDiv"); import HDiv = Dv.HDiv;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import PayT = require("./../Application/PayTogether"); import PayTogether = PayT.PayTogether;
import FC = require("../HComposed/Forms/FormCreator"); import FormCreator = FC.FormCreator;
import DummyCheckFunctionModule = require("../HComposed/Forms/DummyCheckFunction"); import DummyCheckFunction = DummyCheckFunctionModule.DummyCheckFunction;
//////StopImportModulesGen


export class NewChipmentPage implements IHElement {
  container: HDiv;
  constructor(private divLayout: DivLayout, private hFactory: HFactory, private navigator: Navigator, footer: IHElement, private formCreator: FormCreator) {
    this.container = this.divLayout.CreateContainer();
    var jumbo = this.divLayout.CreateJumbotron("You are making a new payment", "", hFactory.GetText(""));
    this.container.AddElement(navigator);
    this.container.AddElement(jumbo);
    this.container.AddElement(this.GetForm(formCreator));
    this.container.AddElement(footer);
  }

  GetElement() {
    return this.container.GetElement();
  }

  GetForm(formCreator) {
    var rows = [
      formCreator.CreateTextElement("Description", "Description", "Enter description here"),
      formCreator.CreateTextElement("Author", "Author", "Your name"),
      formCreator.CreateTextElement("MinimumPayment", "Minimum Payment", "The minimum amount of contribution"),
      formCreator.CreateTextElement("MaximumPayment", "Maximum Payment", "The maximum amount of contribution"),
      formCreator.CreateTextElement("AuthorEmail", "Author Email", "Your Email adress"),
      formCreator.CreateTextElement("ChipinEmailRequired", "Contributor email adress required", "Yes if the email address of the contributors is required,otherwise no")];
    var checkFunction = new DummyCheckFunction();
    var form = formCreator.CreateForm(rows, checkFunction);
    return form;
  }
}
