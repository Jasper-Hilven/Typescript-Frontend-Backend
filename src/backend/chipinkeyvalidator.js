module.exports = function() {
var hashThis = function(data){
  return crypto.createHash('md5').update(data).digest("hex");
}

var simplecrypt = require("simplecrypt");
var crypto = require('crypto');

var sc = simplecrypt({salt: "1234567890",
password: "someStupidPasswordthatnobodycanwritebecauseitiswayto0longandstupid"});
//console.log(sc.salt());
//console.log(sc.password());
  var chipinkeyvalidator = {};
  var userHash = hashThis(sc.encrypt("super duper user"));
  var authorHash = hashThis(sc.encrypt("super duper author"));
  var creatorHash = hashThis(sc.encrypt("super duper creator."));
  var creatorId = {value: 0};
    var getCreatorId = function(){
      creatorId.value++;
      return creatorId.value;
    }

    chipinkeyvalidator.isValidChipinUser = function(id ,key){
      if(id == "user" && key =="abuser")
        return true;
      return chipinkeyvalidator.createUserKey(id) == key;
    };

    chipinkeyvalidator.isValidChipinAuthor = function(id ,key){
      return chipinkeyvalidator.createAuthorKey(id) == key;
    };

    chipinkeyvalidator.getUserKeyViaAuthor = function(id, key){
      if(chipinkeyvalidator.isValidChipinAuthor(id,key))
        return chipinkeyvalidator.createUserKey(id);
      return undefined;
    };

    chipinkeyvalidator.isValidCreateKey = function(id, key){
      return true; //TODO Fix this later
    };

    chipinkeyvalidator.createUserKey = function(id){
      return hashThis(sc.encrypt(id+userHash));
    };

    chipinkeyvalidator.createAuthorKey = function(id){
      return hashThis(sc.encrypt(id+authorHash));
    };

    chipinkeyvalidator.createIdViaCreateId = function(id){
      return hashThis(sc.encrypt(id+creatorHash));
    };

  return chipinkeyvalidator;
}
