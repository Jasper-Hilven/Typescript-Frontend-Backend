module.exports = function(chipinmodel) {

  var chipinprovider = {}
  var chipments = {}
  chipinprovider.getChipment = function(id) {
   if(id = "user")
     return chipinmodel.getDemoChipment();
    var result = chipments[id];
    if (result && !chipinmodel.isChipment(result)) {
      console.log("Provider: Invalid model is stored");
      console.log(result);
    }
    return result;
  };

  chipinprovider.createChipment = function(id, info) {
    if (!(chipinmodel.isChipment(info))) {
      console.log("Tried to add invalid chipment");
      console.log(info);
      return undefined;
    }
    if (chipments[id]) {
      console.log("chipment already exists")
      console.log(id);
      return undefined;
    }
    chipments[id] = info;
    return id;
  };


  chipinprovider.setChipment = function(id, info) {
    if (!chipinmodel.isChipment(info)) {
      console.log("Tried to set invalid chipment");
      console.log(info);
      return undefined;
    }
    if (!chipments[id]) {
      console.log("chipment does not yet exist while setting")
      console.log(id);
      return undefined;
    }
    chipments[id] = info;
    return id;
  };

  chipinprovider.deleteChipment = function(id) {
    if (!chipments[id]) {
      console.log("chipment does not yet exist while deleting")
      console.log(id);
      return undefined;
    }
    delete chipments[id];

  };

  chipinprovider.createChipin = function(id, info) {

    if (!chipinmodel.isChipin(info)) {
      console.log("chipin has invalid info")
      console.log(info);
      return undefined;
    }

    if (!chipments[id]) {
      console.log("chipment does not yet exist while adding chipin")
      console.log(id);
      return undefined;
    }
    chipments[id].chipins.push(info);

  };

  chipinprovider.setChipinOfChipment = function(id, chipinid, info) {
    if (!chipinmodel.isChipin(info)) {
      console.log("chipin has invalid info")
      console.log(info);
      return undefined;
    }
    if (!chipments[id]) {
      console.log("chipment does not yet exist while setting chipin")
      console.log(id);
      return undefined;
    }

    chipments[id].chipins[chipinid] = info;
  };

  chipinprovider.deleteChipinOfChipment = function(id, chipinid) {
    if (!chipments[id]) {
      console.log("chipment does not yet exist while deleting chipin")
      console.log(id);
      return undefined;
    }
    chipments[id].chipins.splice(chipinid, 1);


  };
  return chipinprovider;
}
