import HButton = require("./HButton");
import HDiv = require("./HDiv");
import HLabel = require("./HLabel");
import HLi = require("./HLi");
import Hn = require("./Hn")
import HNav = require("./HNav");
import HParag = require("./HParag");
import HSpan = require("./HSpan");
import HTabling = require("./HTabling");
import HText = require("./HText");
import HTextArea = require("./HTextArea");
import HUl = require("./HUl");
import IHEl = IHElement.IHElement;
import IHElement = require("./IHElement");
import HARefM = require("./HARef");
import HFooter = require("./HFooter");
export class HFactory {
  AddClass(elem: IHEl, eClass: string) {
    elem.GetElement().classList.add(eClass);
  }
  AddClasses(elem: IHEl, eClass: string[]) {
    for (var i in eClass) {
      elem.GetElement().classList.add(eClass[i]);
    }
  }
  SetRole(elem: IHEl, role: string) {
    elem.GetElement().setAttribute("role", role);
  }

  GetARef(child: IHEl, ref: string) {
    return new HARefM.HARef(child, ref);
  }

  GetButton(child: IHEl) {
    return new HButton.HButton(child);
  }
  GetClassedDiv(divClasses: string[]) {
    var div = this.GetDiv();
    this.AddClasses(div, divClasses);
    return div;
  }
  GetClassedFooter(paramClasses: string[], child: IHEl) {
    var footer = this.GetFooter(child);
    this.AddClasses(footer, paramClasses);
    return footer;
  }

  GetClassedParag(paramClasses: string[], child: IHEl) {
    var param = this.GetParag(child);
    this.AddClasses(param, paramClasses);
    return param
  }

  GetClassedUl(paramClass: string[]) {
    var ul = this.GetUl();
    this.AddClasses(ul, paramClass);
    return ul;
  }
  GetDiv() {
    return new HDiv.HDiv();
  }
  GetDivWithChild(child: IHEl) {
    var div = new HDiv.HDiv();
    div.AddElement(child);
    return div;
  }

  GetFooter(child: IHEl) {
    return new HFooter.HFooter(child);
  }
  GetH1(child: IHEl) {
    return new Hn.Hn(child, 1);
  }
  GetH2(child: IHEl) {
    return new Hn.Hn(child, 2);
  }

  GetH3(child: IHEl) {
    return new Hn.Hn(child, 3);
  }
  GetLi(child: IHEl) {
    return new HLi.HLi(child);
  }
  GetLabel(child: IHEl) {
    return new HLabel.HLabel(child);
  }
  GetNav() {
    return new HNav.HNav();
  }
  GetParag(child: IHEl) {
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
