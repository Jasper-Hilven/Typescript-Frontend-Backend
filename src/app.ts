import H = require("./HBasics/HFactory");
import HFactory = H.HFactory;
import D = require("./HComposed/DivFactory");
import DivFactory = D.DivFactory;
import DL = require("./HLayout/DivLayout");
import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator");
import FormCreator = FC.FormCreator;
import R = require("./routing/RouteController");
import RouteController = R.RouteController;

//Create factories
var hFactory = new HFactory();
var dFactory = new DivFactory(hFactory);
var formCreator = new FormCreator(dFactory, hFactory);
var divLayout = new DivLayout(hFactory);

//Build the content
var shortText = "Some random text that is not that cool but rather long because of repitition. ";
var random = Math.floor(3 + Math.random() * 5);
var longText = "";
for (var i = 0; i < random; i++) {
  longText = longText + shortText;
}

var mainContent = document.getElementById("maincontent");
var jumbo = divLayout.CreateJumbotron("Jumbotron heading", longText);
var form = formCreator.GetFirstForm();
var container = divLayout.CreateContainer();
var listener = new RouteController();
container.AddElement(jumbo);
container.AddElement(form);
mainContent.appendChild(container.GetElement());
