import H = require("./HBasics/HFactory");
import HFactory = H.HFactory;
import D = require("./HComposed/DivFactory");
import DivFactory = D.DivFactory;
import DL = require("./HLayout/DivLayout");
import DivLayout = DL.DivLayout;
import FC = require("./HComposed/FormCreator");
import FormCreator = FC.FormCreator;

//Create factories
var hFactory = new HFactory();
var dFactory = new DivFactory(hFactory);
var formCreator = new FormCreator(dFactory, hFactory);
var divLayout = new DivLayout(hFactory);

var mainContent = document.getElementById("maincontent");
var jumbo = divLayout.CreateJumbotron("Jumbotron heading", "some random text that is not that cool");
var form = formCreator.GetFirstForm();
var container = divLayout.CreateContainer();
container.AddElement(jumbo);
mainContent.appendChild(container.GetElement());
