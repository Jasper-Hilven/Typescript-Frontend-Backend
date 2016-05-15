/* tslint:disable */module frontend {
  export class HTable implements IHElement {
    element: HTMLTableElement;
    rows: HTableRow[];
    public AddRow(row: HTableRow) {
      this.rows.push(row);
      this.element.appendChild(row.GetElement());
    }
    public constructor() {
      this.rows = [];
      this.element = document.createElement("table");
    }
    public GetElement() {
      return this.element;
    }
  }

  export class HTableRow implements IHElement {
    element: HTMLTableRowElement;
    cells: HTableCell[];

    public constructor() {
      this.cells = [];
      this.element = document.createElement("tr");
    }
    public AddCell(cell: HTableCell) {
      this.cells.push(cell);
      this.element.appendChild(cell.GetElement());
    }
    public GetElement() {
      return this.element;
    }
  }

  export interface HTableCell extends IHElement {
    GetElement(): HTMLTableCellElement;
  }

  export class HTableCellData implements HTableCell {
    element: HTMLTableDataCellElement;
    child: IHElement;
    public constructor(child) {
      this.element = document.createElement("td");
      this.child = child;
      this.element.appendChild(child.element);
    }
    public GetElement() {
      return this.element;
    }
  }
  export class HTableCellHeader implements HTableCell {
    element: HTMLTableHeaderCellElement;
    child: IHElement;
    public constructor(child) {
      this.element = document.createElement("th");
      this.child = child;
      this.element.appendChild(child.element);

    } public GetElement() {
      return this.element;
    }
  }
}
