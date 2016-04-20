var express = require('express')
http = require('http'),
  path = require('path'),
  keyValidatorModule = require('./chipinkeyvalidator.js'),
  modelModule = require('./chipinmodel.js'),
  providerModule = require('./chipinprovider.js'),
  coreApiModule = require('./coreapi.js'),
  restapiModule = require('./restapi.js');
testRunnerModule = require('./testrunner.js')


var testRunner = testRunnerModule();
var testLogger = testRunner.getLogger();
var exampleGoodUser = function(setup) {
  return setup.model.getUser("Jasper", "jasperhilven@gmail.com");
};
var exampleGoodChipment = function(setup) {
  return setup.model.getChipment(exampleGoodUser(setup), "My birthday", "tomorrow", 3, 5, "euro", "I want money for my birthday", [])
};
var exampleBadChipment = function(setup) {
  return setup.model.getChipment(exampleGoodUser(setup), "My birthday", "tomorrow", "should have been a number", 5, "euro", "I want money for my birthday", [])
};

var setupTest = function() {
  var chipinModel = modelModule();
  var keyValidator = keyValidatorModule();
  var provider = providerModule(chipinModel);
  var coreapi = coreApiModule(provider, keyValidator);
  return {
    model: chipinModel,
    keyVal: keyValidator,
    provider: provider,
    api: coreapi
  };
}

testRunner.addTest("CreateGoodChipmentWithoutCrashing",
  function() {
    var setup = setupTest(); var goodChipment = exampleGoodChipment(setup);
    testLogger.log(goodChipment);
    testLogger.log("everything still good")
    var chipmentCreationResult = setup.api.createChipment("creatorKey", "creatorId", goodChipment);
    testLogger.log("If you see this then a fail occurs");
    return chipmentCreationResult;
  }, false,
  function(chipment) {
    return chipment.userKey && chipment.authorKey && chipment.chipmentId;
  });
/*
testRunner.addTest("ModelShouldCrachForBadChipment",
function(){
  var setup = setupTest();
  var gooduser =
  var exampleBadChipment = setup.model.getChipment(exampleUser,"My birthday","tomorrow","should be a number here",5,"euro","I want money for my birthday",[]);


})
*/

testRunner.runTests();
