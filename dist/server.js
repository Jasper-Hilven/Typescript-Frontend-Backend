var express = require('express'),
  http = require('http'),
  path = require('path'),
  keyValidatorModule = require('./../src/backend/KeyValidator.js'),
  modelModule = require('./../src/backend/ChipinModel.js'),
  providerModule = require('./../src/backend/ChipinProvider.js'),
  coreApiModule = require('./../src/backend/CoreApi.js'),
  restapiModule = require('./../src/backend/RestApi.js'),
  bodyParser = require('body-parser');
var chipinModelChecker = new modelModule.ChipinModelChecker();
var keyValidator = new keyValidatorModule.KeyValidator(require('simplecrypt'),require('crypto'));
var provider = new providerModule.ChipinProvider(chipinModelChecker);
var coreapi = new coreApiModule.CoreApi( keyValidator, provider);
var restApiRouter = express();
var restapi = new restapiModule.RestApi(restApiRouter,coreapi);

var app = express();
app.set('port', process.env.PORT || 3000);

app.use( bodyParser.json());
app.use('/api', restApiRouter);
app.use(express.static('dist'));
app.use(express.static('dist'));
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
