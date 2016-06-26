module frontend {

  export class HTextArea implements IHElement {
    private element: HTMLTextAreaElement;
    public constructor() {
      let area = document.createElement("textarea");
      this.element = area;
    }
    public GetElement(): HTMLTextAreaElement {
      return this.element;
    }
    public SetText(text: string) {
      this.element.value = text;
    }
    public GetText(): string {
      return this.element.value;
    }
    public SetRows(rows){
     this.element.rows = rows;
    }
    public SetCols(cols){
     this.element.cols = cols;
    }

  }
}
