export class User {
  constructor(public name: string, public email: string) {
  }
}
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
  ToJSon(){
throw "implement me";
  }
}
export class ChipmentForAuthor {
  constructor(public chipment: Chipment,
    public userKey: string,
    public authorKey: string,
    public id: string) { }
}
export class Chipin {
  constructor(public user: User, public amount: number) {

  }
}
export class ChipinModelChecker {
  private IsString(myVar) {
    return (typeof myVar === 'string' || myVar instanceof String)
  }
  private IsNumber(myVar) {
    return !isNaN(Number(myVar));
  }
  IsChipment(data: any) {
    if (!data) return false;
    var hasAuthor = this.IsUser(data.author);
    var hasName = this.IsString(data.name);
    var currency = this.IsString(data.currency);
    var description = this.IsString(data.description);
    var minContribution = this.IsNumber(data.maxContribution);
    var maxContribution = this.IsNumber(data.minContribution);
    return hasAuthor && hasName && currency &&
      description && minContribution && maxContribution;
  }
  IsChipin(data: any) {
    return data && this.IsNumber(data.amount) && this.IsUser(data.user);
  }
  IsUser(data: any) {
    return data && this.IsString(data.name) && this.IsString(data.email);
  }
  BuildUser(data: any) {
    return new User(data.name, data.email);
  }
  BuildChipment(data: any): Chipment {
    var author = this.BuildUser(data.author);
    var chipins = this.BuildChipins(data.chipin);
    return new Chipment(author, data.name,
      data.minContribution, data.maxContribution,
      data.currency, data.description, chipins);
  }
  BuildChipin(data: any): Chipin {
    var user = this.BuildUser(data.user);
    return new Chipin(user, data.amount);
  }
  BuildChipins(data: any): [Chipin] {
    var ret: [Chipin] = <[Chipin]>[];
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
      ret.push(this.BuildChipin(data[i]));
    }
    return ret;
  }
}
