"use strict";
var chipinModelModule = require("./ChipinModel");
var CoreApi = (function () {
    function CoreApi(keyValidator, chipinProvider, expressRouter) {
        this.keyValidator = keyValidator;
        this.chipinProvider = chipinProvider;
        this.expressRouter = expressRouter;
    }
    CoreApi.prototype.GetChipmentUser = function (key, id) {
        console.log("getting chipment for a user");
        if (!this.keyValidator.IsValidChipinUser(id, key))
            return undefined;
        var chipin = this.chipinProvider.GetChipment(id);
        if (!chipin)
            return undefined;
        return chipin;
    };
    ;
    CoreApi.prototype.GetChipmentAuthor = function (key, id) {
        if (!this.keyValidator.IsValidChipinAuthor(id, key))
            return undefined;
        var chipment = this.chipinProvider.GetChipment(id);
        if (!chipment)
            return null;
        var userKey = this.keyValidator.GetUserKeyViaAuthor(id, key);
        return new chipinModelModule.ChipmentForAuthor(chipment, userKey, key, id);
    };
    ;
    CoreApi.prototype.CreateChipment = function (key, creatorId, info) {
        if (!this.keyValidator.IsValidCreateKey(creatorId, key))
            return null;
        var chipmentId = this.keyValidator.CreateIdViaCreateId(creatorId);
        var userKey = this.keyValidator.CreateUserKey(chipmentId);
        var authorKey = this.keyValidator.CreateAuthorKey(chipmentId);
        var chipment = this.chipinProvider.GetChipment(chipmentId);
        if (chipment)
            return null;
        var newChipment = this.chipinProvider.CreateChipment(chipmentId, info);
        if (!newChipment)
            return null;
        return new chipinModelModule.ChipmentForAuthor(chipment, userKey, authorKey, chipmentId);
    };
    ;
    CoreApi.prototype.SetChipment = function (key, id, info) {
        if (!this.keyValidator.IsValidChipinAuthor(id, key))
            return undefined;
        var chipin = this.chipinProvider.GetChipment(id);
        if (!chipin)
            return undefined;
        this.chipinProvider.SetChipment(id, info);
    };
    ;
    CoreApi.prototype.RemoveChipment = function (key, id) {
        if (!this.keyValidator.IsValidChipinAuthor(id, key))
            return undefined;
        var chipin = this.chipinProvider.GetChipment(id);
        if (!chipin)
            return undefined;
        return this.chipinProvider.DeleteChipment(id);
    };
    ;
    CoreApi.prototype.CreateChipin = function (key, id, info) {
        if (!this.keyValidator.IsValidChipinUser(id, key))
            return undefined;
        var chipment = this.chipinProvider.GetChipment(id);
        if (!chipment)
            return undefined;
        var chipin = this.chipinProvider.CreateAndAddChipin(id, info);
        if (!chipin)
            return chipin;
        chipment.chipins.push(chipin);
        return chipment.chipins.length;
    };
    ;
    CoreApi.prototype.ChangeChipin = function (key, id, chipinid, info) {
        if (!this.keyValidator.IsValidChipinUser(id, key))
            return undefined;
        var chipment = this.chipinProvider.GetChipment(id);
        if (!chipment)
            return undefined;
        return this.chipinProvider.SetChipinOfChipment(id, chipinid, info);
    };
    ;
    CoreApi.prototype.DeleteChipin = function (key, id, chipinid) {
        if (!this.keyValidator.IsValidChipinUser(id, key)) {
            return undefined;
        }
        var chipin = this.chipinProvider.GetChipment(id);
        if (!chipin) {
            return undefined;
        }
        return this.chipinProvider.DeleteChipinOfChipment(id, chipinid);
    };
    ;
    return CoreApi;
}());
exports.CoreApi = CoreApi;
//# sourceMappingURL=CoreApi.js.map