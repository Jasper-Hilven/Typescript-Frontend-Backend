import chipinModelModule = require("./ChipinModel");
import Chipment = chipinModelModule.Chipment;
import Chipin = chipinModelModule.Chipin;
import ChipinModelChecker = chipinModelModule.ChipinModelChecker;
import User = chipinModelModule.User;
export class ChipinProvider {
  private chipments: { [id: string]: Chipment; };
  constructor(private chipinModelChecker: ChipinModelChecker) {
    this.chipments = {};
  }
  GetChipment(id: string): Chipment {
    if (id == "user")
      return this.GetDemoChipment();
    var result = this.chipments[id];
    if (result && !this.chipinModelChecker.IsChipment(result)) {
      console.log("Provider: Invalid model is stored");
      console.log(result);
    }
    return result;
  }

  CreateChipment(id: string, info) {
    if (!(this.chipinModelChecker.IsChipment(info))) {
      console.log("Tried to add invalid chipment");
      console.log(info);
      return undefined;
    }
    if (this.chipments[id]) {
      console.log("chipment already exists")
      console.log(id);
      return undefined;
    }

    this.chipments[id] = this.chipinModelChecker.BuildChipment(info);
    return id;
  }
  SetChipment(id, info): boolean {
    if (!(this.chipinModelChecker.IsChipment(info))) {
      console.log("Tried to set invalid chipment");
      console.log(info);
      return false;
    }
    if (!this.chipments[id]) {
      console.log("chipment does not yet exist while setting")
      console.log(id);
      return false;
    }
    this.chipments[id] = info;
    return true;
  }
  DeleteChipment(id: string) {
    if (!this.chipments[id]) {
      console.log("chipment does not yet exist while deleting")
      console.log(id);
      return undefined;
    }
    delete this.chipments[id];

  }
  CreateAndAddChipin(id: string, info): number {
    if (!this.chipinModelChecker.IsChipin(info)) {
      console.log("chipin has invalid info")
      console.log(info);
      return -1;
    }

    if (!this.chipments[id]) {
      console.log("chipment does not yet exist while adding chipin")
      console.log(id);
      return -1;
    }
    var newChipin = this.chipinModelChecker.BuildChipin(info);
    this.chipments[id].chipins.push(newChipin);
    return this.chipments[id].chipins.length;
  }

  SetChipinOfChipment(id: string, chipinid: number, info) {
    if (!this.chipinModelChecker.IsChipin(info)) {
      console.log("chipin has invalid info")
      console.log(info);
      return false;
    }
    if (!this.chipments[id]) {
      console.log("chipment does not yet exist while setting chipin")
      console.log(id);
      return false;
    }
    var chipin: Chipin = this.chipinModelChecker.BuildChipin(info);

    this.chipments[id].chipins[chipinid] = chipin;
  };

  DeleteChipinOfChipment(id: string, chipinid: number) {
    if (!this.chipments[id]) {
      console.log("chipment does not yet exist while deleting chipin")
      console.log(id);
      return undefined;
    }
    this.chipments[id].chipins.splice(chipinid, 1);
  };



  GetDemoChipment(): Chipment {
    var chipins: [Chipin] = <[Chipin]>[];
    return new Chipment(
      new User(),
      "Pete party",
      1.23,
      4.56,
      "Euro",
      "bigParty",
      chipins);
  }


}
