import DivFactory = require("./DivFactory");
import DVF = DivFactory.DivFactory;
import HFactory = require("./../HBasics/HFactory");
import HF = HFactory.HFactory;
import IHELement = require("../HBasics/IHElement");
import IHEl = IHELement.IHElement;
export class FormCreator {
  divFactory: DVF;
  hFactory: HF;

  public constructor(divFactory: DVF, hFactory: HF) {
    this.divFactory = divFactory;
    this.hFactory = hFactory;
  }

  GetFirstForm() {
    var mainTable = this.hFactory.GetTable();
    mainTable.AddRow(this.GetLabelTextRow("Name"));
    mainTable.AddRow(this.GetLabelTextRow("Age"));
    return mainTable;
  }

  GetLabelTextRow(labelText: string) {
    var left = this.hFactory.GetTableElementData(this.hFactory.GetText(labelText));
    var right = this.hFactory.GetTableElementData(this.hFactory.GetTextAreaDim(1, 30));
    var retRow = this.hFactory.GetTableRow();
    retRow.AddCell(left);
    retRow.AddCell(right);
    return retRow;
  }
}
