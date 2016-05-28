/* tslint:disable */
/// <reference path="./index.ts"/>

module backend {

    export class DBChipinProvider implements IChipinProvider {

        private chipments: any;
        constructor(private logger: commonend.Logger) {
         this.ConnectToDatabase();
        }
        ConnectToDatabase(){
         let MongoClient = require('mongodb').MongoClient
             , assert = require('assert');
         var url = 'mongodb://nodercoder:nodercodervoter@ds013569.mlab.com:13569/jasperhilvenrestful';
         var me = this;
         MongoClient.connect(url, function(err, db) {
             if (err) {
                 me.logger.Error("Error occured during connection to mongoDB");
                 me.logger.Error(err);
             }
             let collection = db.collection('documents');
             me.chipments = collection;
         });
        }
        GetChipment(id: string): P.Promise<commonend.Chipment> {
            let a: P.Deferred<commonend.Chipment> = P.defer<commonend.Chipment>();
            var me = this;
            this.chipments.find({ id: id }).toArray(function(err, result) {
                if (err) {
                    console.log(err);
                    a.resolve(null);
                } else if (result.length) {
                    me.logger.Info('Found:');
                    me.logger.Info(result);
                    a.resolve(result[0].info);
                } else {
                    me.logger.Info('No document(s) found with defined "find" criteria!');
                    a.resolve(null);
                }
            });
            return a.promise();
        }
        CreateChipment(id: string, info): P.Promise<string> {
            let a: P.Deferred<string> = P.defer<string>();
            this.logger.Info("returning promise...");
            let me = this;
            this.chipments.insert({ id: id, info: info }, function(iResult) { me.logger.Debug("creation result is..."); me.logger.Debug(iResult); a.resolve(id); });
            return a.promise();
        }
        SetChipment(id, info): P.Promise<boolean> {
            let a: P.Deferred<boolean> = P.defer<boolean>();
            console.log("setting chipment..");
            let me = this;
            this.chipments.updateOne({ id: id }, { $set: { info: info } }, function(err, iResult) {
                if (err) { me.logger.Error("error occured during setChipment"); console.log(err); a.resolve(false); return; }
                me.logger.Debug("Setting chipment success"); me.logger.Debug(iResult); a.resolve(true);
            });
            return a.promise();
        }

        DeleteChipment(id: string): P.Promise<boolean> {
            let a: P.Deferred<boolean> = P.defer<boolean>();
            console.log("setting chipment..");
            let me = this;
            this.chipments.deleteOne({ id: id }, function(err, iResult) {
                if (err) { me.logger.Error("error occured during deleteChipment"); console.log(err); a.resolve(false); return; }
                me.logger.Debug("deleting chipment success"); me.logger.Debug(iResult); a.resolve(true);
            });
            return a.promise();
        }

        CreateAndAddChipin(id: string, info): P.Promise<number> {
            let a: P.Deferred<number> = P.defer<number>();
            let me = this;
            this.GetChipment(id).then(c => {
                if (!c) {
                    me.logger.Error("Trying to create chipin for nonexisting chipment");
                    a.resolve(-1); return;
                }
                let newIndex = c.chipins.length;
                c.chipins.push(info);
                this.SetChipment(id, c).then(success => {
                    if (!success) {
                        me.logger.Error("Could not set while createandaddchipin");
                        a.resolve(-1); return;
                    }
                    a.resolve(newIndex);
                });
            });
            return a.promise();
        }

        DeleteChipinOfChipment(id: string, chipinid: number): P.Promise<boolean> {
            throw "notImplemented";
        }
        SetChipinOfChipment(id: string, chipinid: number, info): P.Promise<boolean> {
            throw "notImplemented";
        }


    }


}
