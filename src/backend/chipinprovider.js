"use strict";
var chipinModelModule = require("./ChipinModel");
var Chipment = chipinModelModule.Chipment;
var User = chipinModelModule.User;
var ChipinProvider = (function () {
    function ChipinProvider(chipinModelChecker) {
        this.chipinModelChecker = chipinModelChecker;
        this.chipments = {};
    }
    ChipinProvider.prototype.GetChipment = function (id) {
        if (id == "user")
            return this.GetDemoChipment();
        var result = this.chipments[id];
        if (result && !this.chipinModelChecker.IsChipment(result)) {
            console.log("Provider: Invalid model is stored");
            console.log(result);
        }
        return result;
    };
    ChipinProvider.prototype.CreateChipment = function (id, info) {
        if (!(this.chipinModelChecker.IsChipment(info))) {
            console.log("Tried to add invalid chipment");
            console.log(info);
            return undefined;
        }
        if (this.chipments[id]) {
            console.log("chipment already exists");
            console.log(id);
            return undefined;
        }
        this.chipments[id] = this.chipinModelChecker.BuildChipment(info);
        return id;
    };
    ChipinProvider.prototype.SetChipment = function (id, info) {
        if (!(this.chipinModelChecker.IsChipment(info))) {
            console.log("Tried to set invalid chipment");
            console.log(info);
            return false;
        }
        if (!this.chipments[id]) {
            console.log("chipment does not yet exist while setting");
            console.log(id);
            return false;
        }
        this.chipments[id] = info;
        return true;
    };
    ChipinProvider.prototype.DeleteChipment = function (id) {
        if (!this.chipments[id]) {
            console.log("chipment does not yet exist while deleting");
            console.log(id);
            return undefined;
        }
        delete this.chipments[id];
    };
    ChipinProvider.prototype.CreateAndAddChipin = function (id, info) {
        if (!this.chipinModelChecker.IsChipin(info)) {
            console.log("chipin has invalid info");
            console.log(info);
            return -1;
        }
        if (!this.chipments[id]) {
            console.log("chipment does not yet exist while adding chipin");
            console.log(id);
            return -1;
        }
        var newChipin = this.chipinModelChecker.BuildChipin(info);
        this.chipments[id].chipins.push(newChipin);
        return this.chipments[id].chipins.length;
    };
    ChipinProvider.prototype.SetChipinOfChipment = function (id, chipinid, info) {
        if (!this.chipinModelChecker.IsChipin(info)) {
            console.log("chipin has invalid info");
            console.log(info);
            return false;
        }
        if (!this.chipments[id]) {
            console.log("chipment does not yet exist while setting chipin");
            console.log(id);
            return false;
        }
        var chipin = this.chipinModelChecker.BuildChipin(info);
        this.chipments[id].chipins[chipinid] = chipin;
    };
    ;
    ChipinProvider.prototype.DeleteChipinOfChipment = function (id, chipinid) {
        if (!this.chipments[id]) {
            console.log("chipment does not yet exist while deleting chipin");
            console.log(id);
            return undefined;
        }
        this.chipments[id].chipins.splice(chipinid, 1);
    };
    ;
    ChipinProvider.prototype.GetDemoChipment = function () {
        var chipins = [];
        return new Chipment(new User(), "Pete party", 1.23, 4.56, "Euro", "bigParty", chipins);
    };
    return ChipinProvider;
}());
exports.ChipinProvider = ChipinProvider;
//# sourceMappingURL=ChipinProvider.js.map