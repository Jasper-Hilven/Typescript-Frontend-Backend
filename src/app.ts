import H = require("./library")
var mainContent = document.getElementById("maincontent");
var form = new H.HDiv();
form.AddElement(new H.HLabel("Jasper was hier"));
mainContent.appendChild(form.GetElement());
