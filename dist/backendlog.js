var colors = require('colors/safe');
exports.backendLog = function(){
  var stringifyMesssage=function(message){
    return "" + message;

  }
  var ret = {};
  ret.debug = function(message){
    console.log(colors.green(stringifyMesssage(message)));
  }
  ret.info = function(message){
    console.log(colors.green(stringifyMesssage(message)));
  }
  ret.warn = function(message){
    console.log(colors.yellow(stringifyMesssage(message)));
  }
  ret.error = function(message){
    console.log(colors.red(stringifyMesssage(message)));
  }
  return ret;
};
