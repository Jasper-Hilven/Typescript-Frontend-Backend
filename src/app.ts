//ImportModules HFactory DivLayout FormCreate RouteController Navigation
import H = require("./HBasics/HFactory"); import HFactory = H.HFactory;
import DL = require("./HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./routing/RouteController"); import RouteController = R.RouteController;
import Nav = require("./routing/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;

//Create factories
var hFactory = new HFactory();
var divLayout = new DivLayout(hFactory);
var formCreator = new FormCreator(divLayout, hFactory);

//Build the content
var shortText = "Some random text that is not that cool but rather long because of repitition. ";
var random = Math.floor(3 + Math.random() * 5);
var longText = "";
for (var i = 0; i < random; i++) longText = longText + shortText;

var mainContent = document.getElementById("maincontent");
var jumbo = divLayout.CreateJumbotron("Jumbotron heading", longText);
var form = formCreator.GetFirstForm();
var container = divLayout.CreateContainer();
var listener = new RouteController();
var navigator = new Navigator(hFactory, "PayTogether", [new NavigationElement("Home", ""), new NavigationElement("About", "#About"), new NavigationElement("New Chipment", "#newchipment")]);
container.AddElement(navigator);
container.AddElement(jumbo);
container.AddElement(form);
mainContent.appendChild(container.GetElement());
console.log("Container");
console.log(container);
console.log("MainContent")
console.log(mainContent);
