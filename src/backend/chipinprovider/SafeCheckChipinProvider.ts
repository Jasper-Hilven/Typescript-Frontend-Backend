module backend {
  export class SafeCheckChipinProvider implements IChipinProvider {
    constructor(private deco: IChipinProvider,
      private chipinModelChecker: commonend.ChipinModelChecker,
      private logger: commonend.Logger) {
    }
    GetChipment(id: string) {
      return this.deco.GetChipment(id).then(result => {
        if (result && !this.chipinModelChecker.IsChipment(result)) {
          this.logger.Warn("Provider: Invalid model is stored");
          this.logger.Warn(result);
        }
        return result;
      });
    }
    CreateChipment(id: string, info): P.Promise<string> {
      if (!(this.chipinModelChecker.IsChipment(info))) {
        this.logger.Warn("Tried to add invalid chipment");
        this.logger.Warn(info);
        return P.resolve(undefined);
      }
      return this.deco.CreateChipment(id, info);
    }
    SetChipment(id, info): P.Promise<boolean> {

      if (!(this.chipinModelChecker.IsChipment(info))) {
        this.logger.Warn("Tried to set invalid chipment");
        this.logger.Warn(info);
        return P.resolve(false);
      }
      return this.deco.SetChipment(id, info);
    }

    CreateAndAddChipin(id: string, info): P.Promise<number> {
      if (!this.chipinModelChecker.IsChipin(info)) {
        console.log("chipin has invalid info")
        console.log(info);
        return P.resolve(-1);
      }
      return this.deco.CreateAndAddChipin(id, info);
    }

    DeleteChipment(id: string) {
      return this.deco.DeleteChipment(id);
    }
    DeleteChipinOfChipment(id: string, chipinid: number) {
      return this.deco.DeleteChipinOfChipment(id, chipinid);
    }
    SetChipinOfChipment(id: string, chipinid: number, info) {
      return this.deco.SetChipinOfChipment(id, chipinid, info);
    }
  }
}
