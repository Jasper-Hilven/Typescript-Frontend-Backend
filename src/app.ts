import H = require("./HBasics/HFactory");
import HFactory = H.HFactory;
import D = require("./HComposed/DivFactory");
import DivFactory = D.DivFactory;
import FC = require("./HComposed/FormCreator");
import FormCreator = FC.FormCreator;

var mainContent = document.getElementById("maincontent");
var hFactory = new HFactory();
var dFactory = new DivFactory(hFactory);
var formCreator = new FormCreator(dFactory, hFactory);
var form = formCreator.GetFirstForm();
mainContent.appendChild(form.GetElement());
