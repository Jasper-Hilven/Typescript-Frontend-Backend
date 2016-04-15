//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import Dv = require("../HBasics/HDiv"); import HDiv = Dv.HDiv;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./../HComposed/Forms/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import PayT = require("./../Application/PayTogether"); import PayTogether = PayT.PayTogether;
//////StopImportModulesGen


export class MainPage implements IHElement {
  container: HDiv;

  constructor(private divLayout: DivLayout, private hFactory: HFactory, private navigator: Navigator, footer: IHElement, private myApp: PayTogether) {
    this.container = this.divLayout.CreateContainer();
    var createNewChipmentButton = this.hFactory.GetParag(this.divLayout.GetGoodButton(this.myApp.GetCreateChipment(), this.myApp.GetNewChipmentURL()));
    var jumbo = this.divLayout.CreateJumbotron(this.myApp.GetSlogan(), this.myApp.GetExplanation(), createNewChipmentButton);
    this.container.AddElement(navigator);
    this.container.AddElement(jumbo);
    this.container.AddElement(footer);
  }

  GetElement() {
    return this.container.GetElement();
  }


}
