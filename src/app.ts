import H = require("./HBasics/HFactory");
var mainContent = document.getElementById("maincontent");
var factory = new H.HFactory();
var form = factory.GetDiv();
form.AddElement(factory.GetLabel("Jasper was hier"));
mainContent.appendChild(form.GetElement());
