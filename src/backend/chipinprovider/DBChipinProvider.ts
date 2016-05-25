/* tslint:disable */
/// <reference path="./index.ts"/>

module backend {

    export class DBChipinProvider {
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

    }


}
