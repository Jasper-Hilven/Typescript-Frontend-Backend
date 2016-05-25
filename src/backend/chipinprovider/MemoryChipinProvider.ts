/// <reference path="./index.ts"/>
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
