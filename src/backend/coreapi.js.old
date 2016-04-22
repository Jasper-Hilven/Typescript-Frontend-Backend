var express = require('express');
var router = express.Router();
module.exports = function(chipinprovider, chipinkeyvalidator) {

  var chipincore = {};

  chipincore.getChipmentUser = function(key, id) {
    console.log("getting chipment for a user");
    if (!chipinkeyvalidator.isValidChipinUser(id, key))
      return undefined;
    var chipin = chipinprovider.getChipment(id);
    if (!chipin)
      return undefined;
    return chipin;
  };

  chipincore.getChipmentAuthor = function(key, id) {
    if (!chipinkeyvalidator.isValidChipinAuthor(id, key))
      return undefined;
    var chipment = chipinprovider.getChipment(id);
    if (!chipment)
      return undefined;
    chipment.userKey = chipinkeyvalidator.getUserKeyViaAuthor(id, key);
    return chipment;
  };

  chipincore.createChipment = function(key, creatorId, info) {
    if (!chipinkeyvalidator.isValidCreateKey(creatorId, key))
      return undefined;
    var chipmentId = chipinkeyvalidator.createIdViaCreateId(creatorId);
    var chipment = chipinprovider.getChipment(chipmentId);
    if (chipment)
      return {error: "chipment with id already exists"}; //Already exists
      var newChipment = chipinprovider.createChipment(chipmentId, info);
      if(!newChipment)
        return undefined
    return {userKey: chipinkeyvalidator.createUserKey(chipmentId),
            chipmentId: newChipment,
            authorKey: chipinkeyvalidator.createAuthorKey(chipmentId)};
  };

  chipincore.setChipment = function(key, id, info) {
    if (!chipinkeyvalidator.isValidChipinAuthor(id, key))
      return undefined;
    var chipin = chipinprovider.getChipment(id);
    if (!chipin)
      return undefined;
    chipinprovider.setChipment(id, info);
  };

  chipincore.removeChipment = function(key, id) {
    if (!chipinkeyvalidator.isValidChipinAuthor(id, key))
      return undefined;
    var chipin = chipinprovider.getChipment(id);
    if (!chipin)
      return undefined;
    return chipinprovider.deleteChipment(id);
  };

  chipincore.createChipin = function(key, id, info) {
    if (!chipinkeyvalidator.isValidChipinUser(id, key))
      return undefined;
    var chipin = chipinprovider.getChipment(id);
    if (!chipin)
      return undefined;
    return chipinprovider.createChipin(id, info);
  };
  chipincore.changeChipin = function(key, id, chipinid, info) {
    if (!chipinkeyvalidator.isValidChipinUser(id, key))
      return undefined;
    var chipin = chipinprovider.getChipment(id);
    if (!chipin)
      return undefined;
    return chipinprovider.setChipinOfChipment(id, chipinid, info);


  };
  chipincore.deleteChipin = function(key, id, chipinid){
  if (!chipinkeyvalidator.isValidChipinUser(id, key))
    {return undefined;}
  var chipin = chipinprovider.getChipment(id);
  if (!chipin)
    {return undefined;}
    return chipinprovider.deleteChipinOfChipment(id, chipinid);
  };
  return chipincore;
}
