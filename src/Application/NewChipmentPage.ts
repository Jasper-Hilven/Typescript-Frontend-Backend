//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import Dv = require("../HBasics/HDiv"); import HDiv = Dv.HDiv;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./../HComposed/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import PayT = require("./../Application/PayTogether"); import PayTogether = PayT.PayTogether;
//////StopImportModulesGen


export class NewChipmentPage implements IHElement {
  container: HDiv;
  constructor(private divLayout: DivLayout, private hFactory: HFactory, private navigator: Navigator, private myApp: PayTogether) {
    this.container = this.divLayout.CreateContainer();
    var jumbo = this.divLayout.CreateJumbotron("You are making a new payment", "", hFactory.GetText(""));
    this.container.AddElement(navigator);
    this.container.AddElement(jumbo);
  }

  GetElement() {
    return this.container.GetElement();
  }


}
