import HE = require("./IHElement");
import IHEl = HE.IHElement;

export class HTable implements IHEl {
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

export class HTableRow implements IHEl {
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

export interface HTableCell extends IHEl {
  GetElement(): HTMLTableCellElement;
}

export class HTableCellData implements HTableCell {
  element: HTMLTableDataCellElement;
  public constructor() {
    this.element = document.createElement("td");
  }
  public GetElement() {
    return this.element;
  }
}
export class HTableCellHeader implements HTableCell {
  element: HTMLTableHeaderCellElement;
  public constructor() {
    this.element = document.createElement("th");

  } public GetElement() {
    return this.element;
  }
}
