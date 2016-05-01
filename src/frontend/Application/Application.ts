import {ExistingChipmentPage} from "./ExistingChipmentPage";
//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./../HComposed/Forms/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController; import RouteObserver = R.RouteObserver;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import PayTogetherM = require("./PayTogether"); import PayTogether = PayTogetherM.PayTogether;
//////StopImportModulesGen
/*export class PageDefinition {
  constructor(public PageId: string, public page: )
}
*/
export class Application implements RouteObserver {
  mainContent: HTMLElement;

  constructor(
    private routeController: RouteController,
     private mainPage: IHElement,
     private existingChipmentPage: ExistingChipmentPage,
     private newChipmentPage: IHElement,
     private title: string) {
    this.mainContent = document.getElementById("maincontent");
    routeController.AddLocationChangedEventListener(this);
  }
  Initialize() {
    document.title = this.title;
    var path = this.routeController.GetParts();
    this.LoadPageViaPath(path);
  }
  LocationChanged(oldParts: string[], newParts: string[]) {
    this.LoadPageViaPath(newParts);
  }
  LoadPageViaPath(path: string[]) {
    console.log("Detected path:");
    console.log(path);
    console.log("Stay on main page anyway.");
    while (this.mainContent.children.length > 0) {
      this.mainContent.removeChild(this.mainContent.children[0]);
    }
    if (path.length > 0 && path[0] == "newchipment") {
      this.mainContent.appendChild(this.newChipmentPage.GetElement());
      return;
    }
    if (path.length > 0 && path[0] == "chipment") {
      var id = path[1];
      var key = path[2];
      var activatePage=  ()=>{
        console.log("This should be Application");
        console.log(this);
        this.mainContent.appendChild(this.existingChipmentPage.GetElement());};
      this.existingChipmentPage.SetActive(id,key,activatePage);

      return;
    }
    this.mainContent.appendChild(this.mainPage.GetElement());

  }

}
