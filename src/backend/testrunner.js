var express = require('express');
module.exports = function() {
  var testRunner = {
    tests: [],
    logger: {
      log: function(text) {
        if (!testRunner.logger.details) return;
        console.log(text);
      }
    }
  };
  testRunner.addTest = function(name, test, throwsException, resultCheck) {
    testRunner.tests.push({
      name: name,
      test: test,
      except: throwsException,
      res: resultCheck
    });
  };
  testRunner.getLogger = function() {
    return testRunner.logger;
  }
  testRunner.runTests = function() {
    var tests = testRunner.tests;
    var arrayLength = tests.length;
    var success = 0;
    var failed = 0;
    var handleSuccess = function(test) {
      success++;
    }
    var handleFailed = function(test, reason,exception) {
      failed++;
      console.log("")
      console.log("failed for test:")
      console.log(test.name)
      console.log("")
      console.log("reason")
      console.log("")
      console.log(reason)
      console.log("")
      console.log("exception")
      console.log(exception)
      console.log("")

      testRunner.logger.details = true;
      try {
        test.res(test.test());
      } catch (e) {

      }
      testRunner.logger.details = false;
    }
    for (var i = 0; i < arrayLength; i++) {

      var test = tests[i];
      if (!test.res)
        test.res = function(a) {
          return true;
        }
      try {
        var result = test.test();;
        if (!test.except && test.res(result)) {
          handleSuccess(test)
        } else {
          if(!test.except)
            handleFailed(test,"should have thrown exception")

        }
      } catch (e) {
        if (test.except) {
          handleSuccess(test)
        } else {
          handleFailed(test,"should not have thrown exception",e)
        }
      }
      //Do something
    }
    console.log("-- -- -- -- -- -- -- -- -- --");
    console.log("failed: " + failed + "  success: " + success)
    console.log("-- -- -- -- -- -- -- -- -- --");
  }
  return testRunner;

}
