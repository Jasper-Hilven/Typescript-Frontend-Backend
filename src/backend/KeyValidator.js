"use strict";
var KeyValidator = (function () {
    function KeyValidator(simpleCrypt, crypto) {
        this.simpleCrypt = simpleCrypt;
        this.crypto = crypto;
        this.sc = this.simpleCrypt({
            salt: "1234567890",
            password: "someStupidPasswordthatnobodycanwritebecauseitiswayto0longandstupid"
        });
        this.userHash = this.HashThis(this.sc.encrypt("super duper user"));
        this.authorHash = this.HashThis(this.sc.encrypt("super duper author"));
        this.creatorHash = this.HashThis(this.sc.encrypt("super duper creator."));
        this.creatorId = { value: 0 };
    }
    ;
    KeyValidator.prototype.GetCreatorId = function () {
        this.creatorId.value++;
        return this.creatorId.value;
    };
    ;
    KeyValidator.prototype.HashThis = function (data) {
        return this.crypto.createHash('md5').update(data).digest("hex");
    };
    ;
    KeyValidator.prototype.IsValidChipinUser = function (id, key) {
        if (id == "user" && key == "abuser")
            return true;
        return this.CreateUserKey(id) == key;
    };
    ;
    KeyValidator.prototype.IsValidChipinAuthor = function (id, key) {
        return this.CreateAuthorKey(id) == key;
    };
    ;
    KeyValidator.prototype.GetUserKeyViaAuthor = function (id, key) {
        if (this.IsValidChipinAuthor(id, key))
            return this.CreateUserKey(id);
        return undefined;
    };
    ;
    KeyValidator.prototype.IsValidCreateKey = function (id, key) {
        return true;
    };
    ;
    KeyValidator.prototype.CreateUserKey = function (id) {
        return this.HashThis(this.sc.encrypt(id + this.userHash));
    };
    ;
    KeyValidator.prototype.CreateAuthorKey = function (id) {
        return this.HashThis(this.sc.encrypt(id + this.authorHash));
    };
    ;
    KeyValidator.prototype.CreateIdViaCreateId = function (id) {
        return this.HashThis(this.sc.encrypt(id + this.creatorHash));
    };
    ;
    return KeyValidator;
}());
exports.KeyValidator = KeyValidator;
//# sourceMappingURL=KeyValidator.js.map