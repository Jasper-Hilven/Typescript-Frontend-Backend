import HButton = require("./HButton");
import HDiv = require("./HDiv");
import HLabel = require("./HLabel");
import HLi = require("./HLi");
import Hn = require("./Hn")
import HParag = require("./HParag");
import HSpan = require("./HSpan");
import HTabling = require("./HTabling");
import HText = require("./HText");
import HTextArea = require("./HTextArea");
import HUl = require("./HUl");
import IHEl = IHElement.IHElement;
import IHElement = require("./IHElement");

export class HFactory {
  AddClass(elem: IHEl, eClass: string) {
    elem.GetElement().classList.add(eClass);
  }
  GetButton(child: IHEl) {
    return new HButton.HButton(child);
  }
  GetClassedDiv(divClass: string) {
    var div = this.GetDiv();
    this.AddClass(div, divClass);
    return div;
  }
  GetClassedParam(paramClass: string, child: IHEl) {
    var param = this.GetParam(child);
    this.AddClass(param, paramClass);
    return param
  }

  GetClassedUl(paramClass: string) {
    var ul = this.GetUl();
    this.AddClass(ul, paramClass);
    return ul;
  }
  GetDiv() {
    return new HDiv.HDiv();
  }

  GetH1(child: IHEl) {
    return new Hn.Hn(child, 1);
  }
  GetH2(child: IHEl) {
    return new Hn.Hn(child, 2);
  }
  GetLi(child: IHEl) {
    return new HLi.HLi(child);
  }
  GetLabel(child: IHEl) {
    return new HLabel.HLabel(child);
  }

  GetParam(child: IHEl) {
    return new HParag.HParag(child);
  }

  GetTable() {
    return new HTabling.HTable();
  }

  GetTableRow() {
    return new HTabling.HTableRow();
  }

  GetTableElementHead(child: IHEl) {
    return new HTabling.HTableCellHeader(child);
  }

  GetTableElementData(child: IHEl) {
    return new HTabling.HTableCellData(child);
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
  GetUl(): HUl.HUl {
    return new HUl.HUl();
  }


}
