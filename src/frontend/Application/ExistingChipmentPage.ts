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
import {Chipment, Chipin, User} from "../../backend/ChipinModel";

export class ExistingChipmentPage implements IHElement {
  currentChipment: Chipment;
  container: HDiv;
  constructor(private divLayout: DivLayout, private hFactory: HFactory, private navigator: Navigator, footer: IHElement, private backendProxy: BackendProxy) {
    this.container = this.divLayout.CreateContainer();
    this.container.AddElement(navigator);
    this.container.AddElement(footer);
  }

  SetActive(id:string,key:string,continuation){
  var chipmentId= this.backendProxy.GetChipmentAsUser(id,key,continuation,continuation);

  }

  GetElement() {
    return this.container.GetElement();
  }
}
