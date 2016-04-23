import keyValidatorModule = require("./KeyValidator"); import KeyValidator = keyValidatorModule.KeyValidator;
import chipinProviderModule = require("./ChipinProvider"); import ChipinProvider = chipinProviderModule.ChipinProvider;
import chipinModelModule = require("./ChipinModel");
export class CoreApi {

  constructor(
    private keyValidator: KeyValidator,
    private chipinProvider: ChipinProvider) {
  }

  GetChipmentUser(key, id) {
    console.log("getting chipment for a user");
    if (!this.keyValidator.IsValidChipinUser(id, key))
      return undefined;
    var chipin = this.chipinProvider.GetChipment(id);
    if (!chipin)
      return undefined;
    return chipin;
  };

  GetChipmentAuthor(key, id): chipinModelModule.ChipmentForAuthor {
    if (!this.keyValidator.IsValidChipinAuthor(id, key))
      return undefined;
    var chipment = this.chipinProvider.GetChipment(id);
    if (!chipment)
      return null;
    var userKey = this.keyValidator.GetUserKeyViaAuthor(id, key);
    return new chipinModelModule.ChipmentForAuthor(chipment, userKey, key, id);
  };

  CreateChipment(key, creatorId, info): chipinModelModule.ChipmentForAuthor {
    if (!this.keyValidator.IsValidCreateKey(creatorId, key))
      return null;
    var chipmentId = this.keyValidator.CreateIdViaCreateId(creatorId);
    var userKey = this.keyValidator.CreateUserKey(chipmentId);
    var authorKey = this.keyValidator.CreateAuthorKey(chipmentId);
    var chipment = this.chipinProvider.GetChipment(chipmentId);
    if (chipment)
      return null; //Already exists
    var newChipment = this.chipinProvider.CreateChipment(chipmentId, info);
    if (!newChipment)
      return null;
    return new chipinModelModule.ChipmentForAuthor(chipment, userKey, authorKey, chipmentId);
  };

  SetChipment(key, id, info) {
    if (!this.keyValidator.IsValidChipinAuthor(id, key))
      return false;
    var chipin = this.chipinProvider.GetChipment(id);
    if (!chipin)
      return false;
    return this.chipinProvider.SetChipment(id, info);
  };

  RemoveChipment(key: string, id: string): boolean {
    if (!this.keyValidator.IsValidChipinAuthor(id, key))
      return false;
    var chipin = this.chipinProvider.GetChipment(id);
    if (!chipin)
      return false;
    return this.chipinProvider.DeleteChipment(id);
  };

  CreateChipin(key: string, id: string, info): number {
    if (!this.keyValidator.IsValidChipinUser(id, key))
      return undefined;
    var chipment = this.chipinProvider.GetChipment(id);
    if (!chipment)
      return undefined;
    return this.chipinProvider.CreateAndAddChipin(id, info);
  };
  ChangeChipin(key: string, id: string, chipinid: number, info): boolean {
    if (!this.keyValidator.IsValidChipinUser(id, key))
      return false;
    var chipment = this.chipinProvider.GetChipment(id);
    if (!chipment)
      return false;
    return this.chipinProvider.SetChipinOfChipment(id, chipinid, info);
  };
  DeleteChipin(key: string, id: string, chipinid): boolean {
    if (!this.keyValidator.IsValidChipinUser(id, key))
    { return false; }
    var chipin = this.chipinProvider.GetChipment(id);
    if (!chipin)
    { return false; }
    return this.chipinProvider.DeleteChipinOfChipment(id, chipinid);
  };
}
