import {BackendProxy} from "./BackendProxy";
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
import FillInFormControlModule = require("./FillFormInControl"); import FillFormInControl = FillInFormControlModule.FillFormInControl;
//////StopImportModulesGen


export class NewChipmentPage implements IHElement {
  container: HDiv;
  constructor(private divLayout: DivLayout, private hFactory: HFactory, private navigator: Navigator, footer: IHElement, private formCreator: FormCreator, private backendProxy: BackendProxy) {
    this.container = this.divLayout.CreateContainer();
    var jumbo = this.divLayout.CreateJumbotron("Create a new chipment", "Fill in this form to create a new chipment.", hFactory.GetText(""));
    this.container.AddElement(navigator);
    this.container.AddElement(jumbo);
    var form = this.GetForm(formCreator);

    this.container.AddElement(form);
    this.container.AddElement(footer);
  }
  // FillFormInControl
  GetElement() {
    return this.container.GetElement();
  }

  GetForm(formCreator) {
    var control = new FillFormInControl(this.navigator,this.backendProxy);
    var form = control.GetForm(formCreator);
    form.Update();
    return form;
  }
}
