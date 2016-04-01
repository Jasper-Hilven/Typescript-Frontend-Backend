import HButton = require("./HButton");
import HDiv = require("./HDiv");
import HLabel = require("./HLabel");
import HSpan = require("./HSpan");
import HTabling = require("./HTabling");
import HText = require("./HText");
import HTextArea = require("./HTextArea");
import IHElement = require("./IHElement");

export class HFactory {
  GetButton(child: IHElement.IHElement) {
    return new HButton.HButton(child);
  }
  GetDiv() {
    return new HDiv.HDiv();
  }
  GetLabel(child: IHElement.IHElement) {
    return new HLabel.HLabel(child);
  }
  GetText(text: string) {
    return new HText.HTextSpan(text);
  }
  GetTextArea() {
    return new HTextArea.HTextArea();
  }
  GetTextAreaDim(rows, cols) {
    var textArea = this.GetTextArea();
    var e = textArea.element;
    e.rows = rows;
    e.cols = cols;
    return textArea;
  }
  GetTable() {
    return new HTabling.HTable();
  }
  GetTableRow() {
    return new HTabling.HTableRow();
  }
  GetTableElementHead() {
    return new HTabling.HTableCellHeader();
  }
  GetTableElementData() {
    return new HTabling.HTableCellData();
  }
}
