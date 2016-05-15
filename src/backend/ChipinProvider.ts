/* tslint:disable */
module backend {
  export class ChipinProvider {
    private demoChipment;
    private chipments: { [id: string]: commonend.Chipment; };
    constructor(private chipinModelChecker: commonend.ChipinModelChecker, private logger: commonend.Logger) {
      this.demoChipment = this.GetDemoChipment();
      this.chipments = {"user":this.demoChipment};
    }
    GetChipment(id: string): commonend.Chipment {
      if (id == "user")
        return this.demoChipment;
      let result = this.chipments[id];
      if (result && !this.chipinModelChecker.IsChipment(result)) {
        this.logger.Warn("Provider: Invalid model is stored");
        this.logger.Warn(result);
      }
      return result;
    }

    CreateChipment(id: string, info) {
      if (!(this.chipinModelChecker.IsChipment(info))) {
        this.logger.Warn("Tried to add invalid chipment");
        this.logger.Warn(info);
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
        this.logger.Warn("Tried to set invalid chipment");
        this.logger.Warn(info);
        return false;
      }
      if (!this.chipments[id]) {
        this.logger.Warn("chipment does not yet exist while setting")
        this.logger.Warn(id);
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
      let newChipin = this.chipinModelChecker.BuildChipin(info);
      this.chipments[id].chipins.push(newChipin);
      return this.chipments[id].chipins.length;
    }

    SetChipinOfChipment(id: string, chipinid: number, info): boolean {
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
      let chipin: commonend.Chipin = this.chipinModelChecker.BuildChipin(info);
      this.chipments[id].chipins[chipinid] = chipin;
      return true;
    };

    DeleteChipinOfChipment(id: string, chipinid: number): boolean {
      if (!this.chipments[id]) {
        console.log("chipment does not yet exist while deleting chipin");
        console.log(id);
        return false;
      }
      this.chipments[id].chipins.splice(chipinid, 1);
      return true;
    };



    GetDemoChipment(): commonend.Chipment {
     let demoUser = new commonend.User("Pete's best friend","IChipinned@Petemail.com");
      let chipins: [commonend.Chipin] = <[commonend.Chipin]>[new commonend.Chipin(demoUser,5)];
      return new commonend.Chipment(
        new commonend.User("Pete's mom", "OrganizerMail"),
        "Pete party",
        4.23,
        6.56,
        "Euro",
        "I want a big party for my sunny son. Therefore, I would like to buy a suncake. This costs 20 euro. If we all put in 5 euro, the world will be a better place.",
        chipins);
    }


  }
}
