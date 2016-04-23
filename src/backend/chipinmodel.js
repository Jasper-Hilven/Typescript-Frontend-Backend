"use strict";
var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
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
    function Chipin(user, amount) {
        this.user = user;
        this.amount = amount;
    }
    return Chipin;
}());
exports.Chipin = Chipin;
var ChipinModelChecker = (function () {
    function ChipinModelChecker() {
    }
    ChipinModelChecker.prototype.IsString = function (myVar) {
        return (typeof myVar === 'string' || myVar instanceof String);
    };
    ChipinModelChecker.prototype.IsNumber = function (myVar) {
        return !isNaN(Number(myVar));
    };
    ChipinModelChecker.prototype.IsChipment = function (data) {
        if (!data)
            return false;
        var hasAuthor = this.IsUser(data.author);
        var hasName = this.IsString(data.name);
        var currency = this.IsString(data.currency);
        var description = this.IsString(data.description);
        var minContribution = this.IsNumber(data.maxContribution);
        var maxContribution = this.IsNumber(data.minContribution);
        return hasAuthor && hasName && currency &&
            description && minContribution && maxContribution;
    };
    ChipinModelChecker.prototype.IsChipin = function (data) {
        return data && this.IsNumber(data.amount) && this.IsUser(data.user);
    };
    ChipinModelChecker.prototype.IsUser = function (data) {
        return data && this.IsString(data.name) && this.IsString(data.email);
    };
    ChipinModelChecker.prototype.BuildUser = function (data) {
        return new User(data.name, data.email);
    };
    ChipinModelChecker.prototype.BuildChipment = function (data) {
        var author = this.BuildUser(data.author);
        var chipins = this.BuildChipins(data.chipin);
        return new Chipment(author, data.name, data.minContribution, data.maxContribution, data.currency, data.description, chipins);
    };
    ChipinModelChecker.prototype.BuildChipin = function (data) {
        var user = this.BuildUser(data.user);
        return new Chipin(user, data.amount);
    };
    ChipinModelChecker.prototype.BuildChipins = function (data) {
        var ret = [];
        var arrayLength = data.length;
        for (var i = 0; i < arrayLength; i++) {
            ret.push(this.BuildChipin(data[i]));
        }
        return ret;
    };
    return ChipinModelChecker;
}());
exports.ChipinModelChecker = ChipinModelChecker;
//# sourceMappingURL=ChipinModel.js.map