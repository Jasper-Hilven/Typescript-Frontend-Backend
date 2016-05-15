/* tslint:disable */
module commonend {

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
    ToJSon() {
      return this;
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
    ToJSon() {
      return this;
    }
  }
  export class ChipinModelChecker {
    constructor(private logger: Logger) {
      logger.SetLevel(LogLevel.Debug);

    }
    private IsString(myVar) {
      return (typeof myVar === 'string' || myVar instanceof String)
    }
    private IsStringNonEmpty(myVar) {
      return this.IsString(myVar) && myVar.length > 0;
    }
    private IsNumber(myVar) {
      return !isNaN(Number(myVar));
    }
    private IsNumberPositive(myVar) {
      return !isNaN(Number(myVar)) && myVar > 0;
    }

    IsChipment(data: any) {
      this.logger.Info("Checking for chipment");
      if (!data) { return false; }
      let hasAuthor = this.IsUser(data.author);
      let hasName = this.IsStringNonEmpty(data.name);
      let currency = this.IsStringNonEmpty(data.currency);
      let description = this.IsString(data.description);
      let minContribution = this.IsNumberPositive(data.maxContribution);
      let maxContribution = this.IsNumberPositive(data.minContribution);
      this.logger.Debug("Checking for chipment" + " hasAuthor: " + hasAuthor + ",hasName: " + hasName + ", hascurrency: " + currency);
      this.logger.Debug("Checking for chipment" + " desc: " + description + ",minContr: " + minContribution + ", maxContribution: " + maxContribution);
      let result = hasAuthor && hasName && currency &&
        description && minContribution && maxContribution;
      this.logger.Info("Result is: " + result);
      return result;
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
      let author = this.BuildUser(data.author);
      let chipins = this.BuildChipins(data.chipins);
      return new Chipment(author, data.name,
        data.minContribution, data.maxContribution,
        data.currency, data.description, chipins);
    }
    BuildChipin(data: any): Chipin {
      let user = this.BuildUser(data.user);
      return new Chipin(user, data.amount);
    }
    BuildChipins(data: any): [Chipin] {
      let ret: [Chipin] = <[Chipin]>[];
      let arrayLength = data.length;
      for (let i = 0; i < arrayLength; i++) {
        ret.push(this.BuildChipin(data[i]));
      }
      return ret;
    }
  }
}
