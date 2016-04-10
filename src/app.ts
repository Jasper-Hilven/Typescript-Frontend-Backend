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

//////StopImportModulesGen
var hFactory = new HFactory();
var divLayout = new DivLayout(hFactory);
var formCreator = new FormCreator(divLayout, hFactory);
var myAppInfo = new PayTogether();
var title = myAppInfo.GetTitle();
var createChipment = myAppInfo.GetCreateChipment();
var createChipmentUrl = myAppInfo.GetNewChipmentURL();
var navigationElements = [new NavigationElement("Home", ""), new NavigationElement("About", "#About"), new NavigationElement(createChipment, createChipmentUrl)];
var navigator = new Navigator(hFactory, title, navigationElements);

//Build the content
var routeController = new RouteController();
var mainPage = new MainPage(divLayout, hFactory, navigator, myAppInfo);
var application = new Application(routeController, mainPage, title);

console.log("Application constructed");
console.log(application);
console.log("Initializing application");
application.Initialize();
console.log("Application Initialized");
