//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./HBasics/HFactory"); import HFactory = H.HFactory;
import DL = require("./HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./Route/RouteController"); import RouteController = R.RouteController;
import Nav = require("./Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
import PayTogetherM = require("./Application/PayTogether"); import PayTogether = PayTogetherM.PayTogether;
import App = require("./Application/Application"); import Application = App.Application;
import MainPageM = require("./Application/MainPage"); import MainPage = MainPageM.MainPage;
import NewChipmentPageM = require("./Application/NewChipmentPage"); import NewChipmentPage = NewChipmentPageM.NewChipmentPage;

//////Basic factories
var hFactory = new HFactory();
var divLayout = new DivLayout(hFactory);
var formCreator = new FormCreator(divLayout, hFactory);

//////App info
var myAppInfo = new PayTogether();
var title = myAppInfo.GetTitle();
var createChipment = myAppInfo.GetCreateChipment();
var createChipmentUrl = myAppInfo.GetNewChipmentURL();

//////Navigation
var navigationElements = [new NavigationElement("Home", ""), new NavigationElement("About", "#About"), new NavigationElement(createChipment, createChipmentUrl)];
var createNavigator = function() { return new Navigator(hFactory, title, navigationElements); };
var navigator2 = new Navigator(hFactory, title, navigationElements);
var routeController = new RouteController();

//Build the content
var mainPage = new MainPage(divLayout, hFactory, createNavigator(), myAppInfo);
var chipmentPage = new NewChipmentPage(divLayout, hFactory, createNavigator(), myAppInfo);
var application = new Application(routeController, mainPage, chipmentPage, title);

console.log("Application constructed");
console.log(application);
console.log("Initializing application");
application.Initialize();
console.log("Application Initialized");
