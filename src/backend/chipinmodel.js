"use strict";
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Chipment = (function () {
    function Chipment(author, name, minContribution, maxContribution, currency, description, chipins) {
        this.author = author;
        this.name = name;
        this.minContribution = minContribution;
        this.maxContribution = maxContribution;
        this.currency = currency;
        this.description = description;
        this.chipins = chipins;
    }
    return Chipment;
}());
exports.Chipment = Chipment;
var ChipmentForAuthor = (function () {
    function ChipmentForAuthor(chipment, userKey, authorKey, id) {
        this.chipment = chipment;
        this.userKey = userKey;
        this.authorKey = authorKey;
        this.id = id;
    }
    return ChipmentForAuthor;
}());
exports.ChipmentForAuthor = ChipmentForAuthor;
var Chipin = (function () {
    function Chipin() {
    }
    return Chipin;
}());
exports.Chipin = Chipin;
var ChipinModelChecker = (function () {
    function ChipinModelChecker() {
    }
    ChipinModelChecker.prototype.IsChipment = function (data) {
        throw "implement";
    };
    ChipinModelChecker.prototype.IsChipin = function (data) {
        throw "implement";
    };
    ChipinModelChecker.prototype.BuildChipment = function (data) {
        throw "implement";
    };
    ChipinModelChecker.prototype.BuildChipin = function (data) {
        throw "implement";
    };
    return ChipinModelChecker;
}());
exports.ChipinModelChecker = ChipinModelChecker;
//# sourceMappingURL=ChipinModel.js.map