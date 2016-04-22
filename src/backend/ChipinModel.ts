export class User { }
export class Chipment {
  constructor(
    public author: User,
    public name: string,
    public minContribution: number,
    public maxContribution: number,
    public currency: string,
    public description: string,
    public chipins: [Chipin]) {
  }
}
export class ChipmentForAuthor {
  constructor(public chipment: Chipment,
    public userKey: string,
    public authorKey: string,
    public id: string) { }
}
export class Chipin { }
export class ChipinModelChecker {
  IsChipment(data: any) {
    throw "implement";
  }
  IsChipin(data: any) {
    throw "implement";
  }
  BuildChipment(data: any): Chipment {
    throw "implement";
  }
  BuildChipin(data: any): Chipin {
    throw "implement";
  }
}
