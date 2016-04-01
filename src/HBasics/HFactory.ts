import HButton = require("./HButton");
import HDiv = require("./HDiv");
import HLabel = require("./HLabel");
import HTextArea = require("./HTextArea");
export class HFactory {
  GetButton(text) { return new HButton.HButton(text); }
  GetDiv() { return new HDiv.HDiv(); }
  GetLabel(text) { return new HLabel.HLabel(text); }
  GetTextArea() { return new HTextArea.HTextAreaElement(); }

}
