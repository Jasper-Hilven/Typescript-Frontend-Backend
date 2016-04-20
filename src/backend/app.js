var express = require('express'),
http = require('http'),
    path = require('path'),
    keyValidatorModule = require('./chipinkeyvalidator.js'),
    modelModule = require('./chipinmodel.js'),
    providerModule = require('./chipinprovider.js'),
    coreApiModule = require('./coreapi.js'),
    restapiModule = require('./restapi.js');

var chipinModel = modelModule();
var keyValidator = keyValidatorModule();
var provider = providerModule(chipinModel);
var coreapi = coreApiModule(provider,keyValidator);
var restapi = restapiModule(coreapi);

var app = express();
app.set('port', process.env.PORT || 3000);

app.use('/api',function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', restapi);
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
