//////ImportModules HFactory DivLayout FormCreate RouteController Navigation
//////StartImportModulesGen
import H = require("./HBasics/HFactory"); import HFactory = H.HFactory;
import DL = require("./HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator"); import FormCreator = FC.FormCreator; import HFormTextElement = FC.HFormTextElement; import DummyCheckFunction = FC.DummyCheckFunction;
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
var routeController = new RouteController();

//Build the content
var formCreator = new FormCreator(divLayout, hFactory);
var rows = [
  formCreator.CreateTextElement("Description", "Description", "Enter description here"),
  formCreator.CreateTextElement("Author", "Author", "Your name"),
  formCreator.CreateTextElement("MinimumPayment", "Minimum Payment", "The minimum amount of contribution"),
  formCreator.CreateTextElement("MaximumPayment", "Maximum Payment", "The maximum amount of contribution"),
  formCreator.CreateTextElement("AuthorEmail", "Author Email", "Your Email adress"),
  formCreator.CreateTextElement("ChipinEmailRequired", "Contributor email adress required", "Yes if the email address of the contributors is required,otherwise no")];
var checkFunction = new DummyCheckFunction();
var form = formCreator.CreateForm(rows, checkFunction);
var footerText = "copyright, 2016 PayTogether, Inc.";
var mainPage = new MainPage(divLayout, hFactory, createNavigator(), divLayout.GetFooter(footerText), myAppInfo);
var chipmentPage = new NewChipmentPage(divLayout, hFactory, createNavigator(), divLayout.GetFooter(footerText), myAppInfo, form);
var application = new Application(routeController, mainPage, chipmentPage, title);
console.log("Application constructed");
console.log(application);
console.log("Initializing application");
application.Initialize();
console.log("Application Initialized");
