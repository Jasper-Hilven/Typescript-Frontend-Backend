/* tslint:disable */
module backend {
    export class CoreApi {

        constructor(
            private keyValidator: KeyValidator,
            private chipinProvider: IChipinProvider,
            private mailClient: any,
            private logger: commonend.Logger) {
        }

        GetChipmentUser(key, id): P.Promise<commonend.Chipment> {
            this.logger.Info("getting chipment for a user");
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(null);
            return this.chipinProvider.GetChipment(id);
        };

        GetChipmentAuthor(key, id): P.Promise<commonend.ChipmentForAuthor> {
         this.logger.Info("getting chipment for an author");
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
         this.logger.Info("Creating new chipment");
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
                if (chipment) { this.logger.Warn("Chipment creation aborted: Already exists"); return true; } return false;
            })
                .then(exists => {
                    if (exists) {
                        return P.resolve<string>(null);
                    }
                    return this.chipinProvider.CreateChipment(chipmentId, info);
                }).then((newChipment: string) => {
                    if (!newChipment) {
                        this.logger.Warn("Chipment creation aborted: Provider could not create");
                        return <commonend.ChipmentForAuthor>(null);
                    }
                    var retNewChipment = new commonend.ChipmentForAuthor(info, userKey, authorKey, chipmentId);
                    this.SendMailToClient(retNewChipment);
                    return retNewChipment;
                });
        };
        SendMailToClient(chipment: commonend.ChipmentForAuthor) {
            this.logger.Info("Got chipment");
            this.logger.Info(chipment);
            let sender = chipment.chipment.author.email;
            let nameChipment = chipment.chipment.name;
            let fullSender = {}
            fullSender[sender] = sender;
            let friendLink = "https://chipmentfrontend.herokuapp.com//#" + "chipin_with" + "/" + chipment.id + "/" + chipment.userKey;
            let privateLink = "https://chipmentfrontend.herokuapp.com//#" + "chipin_with" + "/" + chipment.id + "/" + chipment.authorKey;

            let friendMail = {
                "to": fullSender,
                "from": ["jasperhilven@gmail.com", "The chipment team"],
                "subject": "You created a new chipin: " + nameChipment + ". Send this mail to your friends",
                "html": "<h3>Via this link(" + friendLink + ") your friends can chipin with you</h3>"
            }
            let privateMail = {
                "to": fullSender,
                "from": ["jasperhilven@gmail.com", "The chipment team"],
                "subject": "You created a new chipin: " + nameChipment + ". Keep this mail for yourself",
                "html": "<h3>Via this link(" + privateLink + ") you can edit this chipin</h3>"
            }
            this.mailClient.send_email(friendMail);
            //this.mailClient.send_email(privateMail);
        }


        SetChipment(key, id, info): P.Promise<boolean> {
         this.logger.Info("Setting chipment");
            if (!this.keyValidator.IsValidChipinAuthor(id, key))
                return P.resolve(false);
            return this.chipinProvider.GetChipment(id)
                .then(chipment => { return chipment ? this.chipinProvider.SetChipment(id, info) : P.resolve(false) });

        };

        RemoveChipment(key: string, id: string): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinAuthor(id, key))
                return P.resolve(false);
            return this.chipinProvider.GetChipment(id)
                .then(chipment => chipment ? this.chipinProvider.DeleteChipment(id) : P.resolve(false));
        };

        CreateChipin(key: string, id: string, info): P.Promise<number> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(-1);


            return this.chipinProvider.GetChipment(id)
                .then(chipment => chipment ? this.chipinProvider.CreateAndAddChipin(id, info) : P.resolve(-1));
        };

        ChangeChipin(key: string, id: string, chipinid: number, info): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
                return P.resolve(false);
            let chipment = this.chipinProvider.GetChipment(id)
                .then(chipment => chipment ? this.chipinProvider.SetChipinOfChipment(id, chipinid, info) : P.resolve(false));
        };

        DeleteChipin(key: string, id: string, chipinid): P.Promise<boolean> {
            if (!this.keyValidator.IsValidChipinUser(id, key))
            { return P.resolve(false); }
            return this.chipinProvider.GetChipment(id)
                .then(chipin => chipin ? this.chipinProvider.DeleteChipinOfChipment(id, chipinid) : P.resolve(false));
        };

    }
}
