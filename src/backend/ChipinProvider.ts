/* tslint:disable */
module backend {
    export interface IChipinProvider {
        GetChipment(id: string): P.Promise<commonend.Chipment>
        CreateChipment(id: string, info): P.Promise<string>
        SetChipment(id, info): P.Promise<boolean>
        DeleteChipment(id: string): P.Promise<boolean>
        CreateAndAddChipin(id: string, info): P.Promise<number>
        DeleteChipinOfChipment(id: string, chipinid: number): P.Promise<boolean>
        SetChipinOfChipment(id: string, chipinid: number, info): P.Promise<boolean>
    }
    export class SafeCheckChipinProvider implements IChipinProvider {
        constructor(private deco: IChipinProvider,
            private chipinModelChecker: commonend.ChipinModelChecker,
            private logger: commonend.Logger) {
        }
        GetChipment(id: string) {
            return this.deco.GetChipment(id).then(result => {
                if (result && !this.chipinModelChecker.IsChipment(result)) {
                    this.logger.Warn("Provider: Invalid model is stored");
                    this.logger.Warn(result);
                }
                return result;
            });
        }
        CreateChipment(id: string, info): P.Promise<string> {
            if (!(this.chipinModelChecker.IsChipment(info))) {
                this.logger.Warn("Tried to add invalid chipment");
                this.logger.Warn(info);
                return P.resolve(undefined);
            }
            return this.deco.CreateChipment(id, info);
        }
        SetChipment(id, info): P.Promise<boolean> {

            if (!(this.chipinModelChecker.IsChipment(info))) {
                this.logger.Warn("Tried to set invalid chipment");
                this.logger.Warn(info);
                return P.resolve(false);
            }
            return this.deco.SetChipment(id, info);
        }

        CreateAndAddChipin(id: string, info): P.Promise<number> {
            if (!this.chipinModelChecker.IsChipin(info)) {
                console.log("chipin has invalid info")
                console.log(info);
                return P.resolve(-1);
            }
            return this.deco.CreateAndAddChipin(id,info);
           }

           DeleteChipment(id: string){
            return this.deco.DeleteChipment(id);
           }
           DeleteChipinOfChipment(id: string, chipinid: number){
            return this.deco.DeleteChipinOfChipment(id,chipinid);
           }
           SetChipinOfChipment(id: string, chipinid: number, info){
            return this.deco.SetChipinOfChipment(id,chipinid,info);
           }



    }
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


    export class ChipinProvider implements IChipinProvider {
        private demoChipment;
        private chipments: { [id: string]: commonend.Chipment; };
        constructor(private chipinModelChecker: commonend.ChipinModelChecker, private logger: commonend.Logger) {
            this.demoChipment = this.GetDemoChipment();
            this.chipments = { "user": this.demoChipment };
        }
        GetChipment(id: string): P.Promise<commonend.Chipment> {
            console.log("provider getting chipment");
            if (id == "user")
                return P.resolve(this.demoChipment);
            return P.resolve(this.chipments[id]);
        }

        CreateChipment(id: string, info): P.Promise<string> {
            this.chipments[id] = this.chipinModelChecker.BuildChipment(info);
            return P.resolve(id);
        }
        SetChipment(id, info): P.Promise<boolean> {
            this.chipments[id] = info;
            return P.resolve(true);
        }
        DeleteChipment(id: string): P.Promise<boolean> {
            delete this.chipments[id];
            return P.resolve(true);

        }
        CreateAndAddChipin(id: string, info): P.Promise<number> {
            let newChipin = this.chipinModelChecker.BuildChipin(info);
            this.chipments[id].chipins.push(newChipin);
            return P.resolve(this.chipments[id].chipins.length);
        }

        SetChipinOfChipment(id: string, chipinid: number, info): P.Promise<boolean> {
            let chipin: commonend.Chipin = this.chipinModelChecker.BuildChipin(info);
            this.chipments[id].chipins[chipinid] = chipin;
            return P.resolve(true);
        };

        DeleteChipinOfChipment(id: string, chipinid: number): P.Promise<boolean> {
            this.chipments[id].chipins.splice(chipinid, 1);
            return P.resolve(true);
        };



        GetDemoChipment(): commonend.Chipment {
            let demoUser = new commonend.User("Pete's best friend", "IChipinned@Petemail.com");
            let chipins: [commonend.Chipin] = <[commonend.Chipin]>[new commonend.Chipin(demoUser, 5)];
            return new commonend.Chipment(
                new commonend.User("Pete's mom", "OrganizerMail"),
                "Pete party",
                4.23,
                6.56,
                "Euro",
                "I want a big party for my sunny son. Therefore, I would like to buy a suncake. This costs 20 euro. If we all put in 5 euro, the world will be a better place.",
                chipins);
        }
    }
}
