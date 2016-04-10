//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./HBasics/HFactory"); import HFactory = H.HFactory;
import DL = require("./HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./Route/RouteController"); import RouteController = R.RouteController;
import Nav = require("./Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import App = require("./Application/PayTogether"); import PayTogether = App.PayTogether;
//////StopImportModulesGen

var hFactory = new HFactory();
var divLayout = new DivLayout(hFactory);
var formCreator = new FormCreator(divLayout, hFactory);
var myApp = new PayTogether();

//Build the content

document.title = myApp.GetTitle();
var mainContent = document.getElementById("maincontent");
var createNewChipmentButton = hFactory.GetParag(divLayout.GetGoodButton(myApp.GetCreateChipment(), myApp.GetNewChipmentURL()));
var jumbo = divLayout.CreateJumbotron(myApp.GetSlogan(), myApp.GetExplanation(), createNewChipmentButton);
var form = formCreator.GetFirstForm();
var container = divLayout.CreateContainer();
var listener = new RouteController();
var navigator = new Navigator(hFactory, myApp.GetTitle(), [new NavigationElement("Home", ""), new NavigationElement("About", "#About"), new NavigationElement(myApp.GetCreateChipment(), myApp.GetNewChipmentURL())]);
container.AddElement(navigator);
container.AddElement(jumbo);
mainContent.appendChild(container.GetElement());
console.log("Container");
console.log(container);
console.log("MainContent");
console.log(mainContent);
