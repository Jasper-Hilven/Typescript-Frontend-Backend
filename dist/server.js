var express = require('express'),
  http = require('http'),
  path = require('path'),
  morgan = require('morgan'),
  keyValidatorModule = require('./../src/backend/KeyValidator.js'),
  modelModule = require('./../src/backend/ChipinModel.js'),
  providerModule = require('./../src/backend/ChipinProvider.js'),
  coreApiModule = require('./../src/backend/CoreApi.js'),
  restapiModule = require('./../src/backend/RestApi.js'),
  bodyParser = require('body-parser'),
  backendLog = require('./backendlog').backendLog(),
  loggerFactoryModule = require('./../src/backend/logging/LoggerFactory.js');

var loggerFactory = new loggerFactoryModule.LoggerFactory(backendLog);
var chipinModelChecker = new modelModule.ChipinModelChecker(loggerFactory.GetLogger("chipinModelChecker"));
var keyValidator = new keyValidatorModule.KeyValidator(require('simplecrypt'),require('crypto'), loggerFactory.GetLogger("keyValidator"));
var provider = new providerModule.ChipinProvider(chipinModelChecker, loggerFactory.GetLogger("provider"));
var coreapi = new coreApiModule.CoreApi( keyValidator, provider, loggerFactory.GetLogger("coreapi"));
var restApiRouter = express();
var restapi = new restapiModule.RestApi(restApiRouter,coreapi,loggerFactory);

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', restApiRouter);
app.use(express.static('dist'));
app.use(express.static('dist'));
http.createServer(app).listen(app.get('port'), function() {
  backendLog.info("Express server listening on port " + app.get('port'));
});
