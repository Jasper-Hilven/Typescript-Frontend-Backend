/* tslint:disable */
/// <reference path="./index.ts"/>

module backend {

    export class DBChipinProvider implements IChipinProvider {
        /*SendGetRequestP(url): P.Promise<any> {
          let a: P.Deferred<any> = P.defer<any>();
          this.SendGetRequest(url,
           (v:any)=>{
           console.log("resolving promise");
           a.resolve(v);
          },
          (e:any)=>{
           console.log("rejecting promise", e);
          a.reject(e);
         });
          console.log("returning promise...")
          return a.promise();
        }*/

        private chipments: any;
        constructor(private logger: commonend.Logger) {
            let MongoClient = require('mongodb').MongoClient
                , assert = require('assert');
            var url = 'mongodb://nodercoder:nodercodervoter@ds013569.mlab.com:13569/jasperhilvenrestful';
            var me = this;
            MongoClient.connect(url, function(err, db) {
                console.log("err should be null");
                console.log(err);
                console.log("If so, connected correctly to server");
                let collection = db.collection('documents');
                me.chipments = collection;
            });
        }

        GetChipment(id: string): P.Promise<commonend.Chipment> {
            throw "notImplemented";
        }
        CreateChipment(id: string, info): P.Promise<string> {
         let a: P.Deferred<string> = P.defer<string>();
         console.log("returning promise...")
         this.chipments.insert({id: id, info: info},function(iResult){this.logger.Debug("creation result is...");this.logger.Debug(iResult); a.resolve(id);});
         return a.promise();
        }
        SetChipment(id, info): P.Promise<boolean> {
            throw "notImplemented";
        }

        DeleteChipment(id: string): P.Promise<boolean> {
            throw "notImplemented";
        }

        CreateAndAddChipin(id: string, info): P.Promise<number> {
            throw "notImplemented";
        }

        DeleteChipinOfChipment(id: string, chipinid: number): P.Promise<boolean> {
            throw "notImplemented";
        }
        SetChipinOfChipment(id: string, chipinid: number, info): P.Promise<boolean> {
            throw "notImplemented";
        }


    }


}
