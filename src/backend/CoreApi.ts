/* tslint:disable */
module backend {
    export class CoreApi {

        constructor(
            private keyValidator: KeyValidator,
            private chipinProvider: IChipinProvider,
            private logger: commonend.Logger) {
        }

        GetChipmentUser(key, id): P.Promise<commonend.Chipment> {
            this.logger.Info("getting chipment for a user");
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(null);
            return this.chipinProvider.GetChipment(id);
        };

        GetChipmentAuthor(key, id): P.Promise<commonend.ChipmentForAuthor> {
            if (!this.keyValidator.IsValidChipinAuthor(id, key))
                return P.resolve(null);
            let chipmentP = this.chipinProvider.GetChipment(id);
            let f = chipment => {
                if (!chipment)
                    return <commonend.ChipmentForAuthor>(null);
                let userKey = this.keyValidator.GetUserKeyViaAuthor(id, key);
                return new commonend.ChipmentForAuthor(chipment, userKey, key, id);
            };
            return chipmentP.then(f);
        };

        CreateChipment(key, creatorId, info): P.Promise<commonend.ChipmentForAuthor> {
            if (!this.keyValidator.IsValidCreateKey(creatorId, key)) {
                this.logger.Warn("Chipment creation aborted: invalid key");
                return null;
            }
            let chipmentId = this.keyValidator.CreateIdViaCreateId(creatorId);
            let userKey = this.keyValidator.CreateUserKey(chipmentId);
            let authorKey = this.keyValidator.CreateAuthorKey(chipmentId);
            let chipmentP = this.chipinProvider.GetChipment(chipmentId);
            var chipmentRes = undefined;
            return chipmentP.then(chipment => {
             chipmentRes = chipment;
                if (chipment) {this.logger.Warn("Chipment creation aborted: Already exists");return true;}return false;})
                .then(exists=>{
                 if(exists){
                     return P.resolve<string>(null);
                 }
                return this.chipinProvider.CreateChipment(chipmentId, info);
               }).then((newChipment: string) => {
                    if (!newChipment) {
                        this.logger.Warn("Chipment creation aborted: Provider could not create");
                        return <commonend.ChipmentForAuthor>(null);
                    }
                    return new commonend.ChipmentForAuthor(chipmentRes, userKey, authorKey, chipmentId);
                });
        };

        SetChipment(key, id, info): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinAuthor(id, key))
                return P.resolve(false);
            return this.chipinProvider.GetChipment(id)
            .then(chipment=>{return chipment?this.chipinProvider.SetChipment(id,info):P.resolve(false)});
        };

        RemoveChipment(key: string, id: string): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinAuthor(id, key))
                return P.resolve(false);
            return this.chipinProvider.GetChipment(id)
            .then(chipment =>chipment? this.chipinProvider.DeleteChipment(id):P.resolve(false));
        };

        CreateChipin(key: string, id: string, info): P.Promise<number> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(-1);
            return this.chipinProvider.GetChipment(id)
            .then(chipment => chipment? this.chipinProvider.CreateAndAddChipin(id, info) : P.resolve(-1));
        };

        ChangeChipin(key: string, id: string, chipinid: number, info): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(false);
            let chipment = this.chipinProvider.GetChipment(id)
            .then(chipment=> chipment?this.chipinProvider.SetChipinOfChipment(id, chipinid, info):P.resolve(false));
        };

        DeleteChipin(key: string, id: string, chipinid): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
            { return P.resolve(false); }
            return this.chipinProvider.GetChipment(id)
            .then(chipin => chipin? this.chipinProvider.DeleteChipinOfChipment(id, chipinid) : P.resolve(false));
        };

    }
}
