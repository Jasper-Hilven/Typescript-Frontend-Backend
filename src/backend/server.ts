/// <reference path="./index.ts"/>
/* tslint:disable */
declare var require;
declare var process;
var express = require('express');
var http = require('http');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nodeCrypto = require('crypto');
var nodeSimpleCrypt = require('simplecrypt');
/* tslint:enable */
/* tslint:disable */

module backend {
    export class Server {
        private app;
        private serverLog: commonend.Logger;
        private mailProvider: MailinProvider;
        constructor(filesLocation) {
            let restApiRouter = express();
            let loggerFactory = new commonend.LoggerFactory(console);
            this.serverLog = loggerFactory.GetLogger("Server");
            let modelChecker = new commonend.ChipinModelChecker(loggerFactory.GetLogger("modelChecker"));
            let provider:IChipinProvider = new DBChipinProvider(loggerFactory.GetLogger("provider"));
            let checkedProvider = new SafeCheckChipinProvider(provider,modelChecker,loggerFactory.GetLogger("providerChecker"));
            let keyValidator = new KeyValidator(nodeSimpleCrypt, nodeCrypto, loggerFactory.GetLogger("keyValidator"));
            let CoreApi = new backend.CoreApi(keyValidator, checkedProvider, loggerFactory.GetLogger("CoreApi"));
            let RestApi = new backend.RestApi(restApiRouter, CoreApi, loggerFactory);
            this.mailProvider = new MailinProvider();
            let app = express();
            app.set('port', process.env.PORT || 3000);


            app.use(morgan('combined'));
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());
            app.use('/api', restApiRouter);
            app.use(express.static(filesLocation));
            this.app = app;
        }

        public Start(): void {
            var mailin = this.mailProvider.GetMailin();
            var client = new mailin("https://api.sendinblue.com/v2.0", "hIBJ8KL1NYG7ydmA");
            let data = {
                "to": { "jasperhilven@gmail.com": "jasperhilven@gmail.com" },
                "from": ["jasperhilven@gmail.com", "Jasper Hilven"],
                "subject": "You created a new chipin!",
                "html": "This is the <h1>HTML</h1>"
            }



            let me = this;
            http.createServer(this.app).listen(this.app.get('port'), () =>
                me.serverLog.Info("Express server listening on port " + this.app.get('port'))
            );
        }
    }
}
