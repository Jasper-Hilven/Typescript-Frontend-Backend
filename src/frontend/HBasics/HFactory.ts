/* tslint:disable *//// <reference path="index.ts" />

module frontend {

    export class HFactory {
        AddClass(elem: IHElement, eClass: string) {
            elem.GetElement().classList.add(eClass);
        }
        AddClasses(elem: IHElement, eClass: string[]) {
            for (let i in eClass) {
                elem.GetElement().classList.add(eClass[i]);
            }
        }
        SetRole(elem: IHElement, role: string) {
            elem.GetElement().setAttribute("role", role);
        }
        SetType(elem: IHElement, type: string) {
            elem.GetElement().setAttribute("type", type);
        }

        GetARef(child: IHElement, ref: string) {
            return new HARef(child, ref);
        }

        GetButton(child: IHElement) {
            return new HButton(child);
        }
        GetClassedDiv(divClasses: string[]) {
            let div = this.GetDiv();
            this.AddClasses(div, divClasses);
            return div;
        }
        GetClassedFooter(paramClasses: string[], child: IHElement) {
            let footer = this.GetFooter(child);
            this.AddClasses(footer, paramClasses);
            return footer;
        }

        GetClassedParag(paramClasses: string[], child: IHElement) {
            let param = this.GetParag(child);
            this.AddClasses(param, paramClasses);
            return param
        }

        GetClassedUl(paramClass: string[]) {
            let ul = this.GetUl();
            this.AddClasses(ul, paramClass);
            return ul;
        }
        GetDiv() {
            return new HDiv();
        }
        GetDivWithChild(child: IHElement) {
            let div = new HDiv();
            div.AddElement(child);
            return div;
        }

        GetFooter(child: IHElement) {
            return new HFooter(child);
        }
        GetH1(child: IHElement) {
            return new Hn(child, 1);
        }
        GetH2(child: IHElement) {
            return new Hn(child, 2);
        }

        GetH3(child: IHElement) {
            return new Hn(child, 3);
        }
        GetLi(child: IHElement) {
            return new HLi(child);
        }
        GetLabel(child: IHElement) {
            return new HLabel(child);
        }
        GetNav() {
            return new HNav();
        }
        GetParag(child: IHElement) {
            return new HParag(child);
        }
        GetRadioButton() {
            return new HRadioButton();
        }
        GetRangeSlider(info: HRangeSliderInfo) {
         return new HRangeSlider(info.min, info.max, info.initMin, info.initMax , info.step);
        }
        GetTable() {
            return new HTable();
        }

        GetTableRow() {
            return new HTableRow();
        }

        GetTableElementHead(child: IHElement) {
            return new HTableCellHeader(child);
        }

        GetTableElementData(child: IHElement) {
            return new HTableCellData(child);
        }

        GetText(text: string) {
            return new HTextSpan(text);
        }
        GetTextArea() {
            return new HTextArea();
        }
        GetTextAreaDim(rows, cols) {
            let textArea = this.GetTextArea();
            let e = textArea.GetElement();
            e.rows = rows;
            e.cols = cols;
            return textArea;
        }
        GetUl(): HUl {
            return new HUl();
        }


    }
}
