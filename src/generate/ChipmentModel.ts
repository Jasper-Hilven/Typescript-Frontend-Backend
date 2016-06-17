/// <reference path="./index.gen.ts"/>

module generate {
  export class ChipmentModelDescription {
    private userRead: SecurityLevel;
    private authorRead: SecurityLevel;
    private userReadWrite: SecurityLevel;
    private authorReadWrite: SecurityLevel;

    constructor() {
      this.authorRead = new SecurityLevel("author", generate.Capability.Read);
      this.authorReadWrite = new SecurityLevel("author", Capability.ReadWrite);
      this.userRead = new SecurityLevel("user", Capability.Read);
      this.userReadWrite = new SecurityLevel("user", Capability.ReadWrite);
    }

    public GetChipmentModel(): Composed {
      let author = this.BindAuthorLevelUserRead("user",this.GetUser());
      let name = this.BindAuthorLevelUserRead("name",new SimpleProperty(PropertyType.PString));
      let minContribution = this.BindAuthorLevelUserRead("minContribution", new SimpleProperty(PropertyType.PNumber));
      let maxContribution = this.BindAuthorLevelUserRead("maxContribution", new SimpleProperty(PropertyType.PNumber));
      let currency = this.BindAuthorLevelUserRead("currency",new SimpleProperty( PropertyType.PString));
      let description = this.BindAuthorLevelUserRead("description", new SimpleProperty(PropertyType.PString));
      let chipins = this.BindAllSecurityLevels("chipins",new ListProperty( this.GetChipinModel()));
      let bindings = [author, name, minContribution, maxContribution, currency, description, chipins];
      let chipment = new Composed("Chipment", true, bindings);
      return chipment;
    }

    private GetChipinModel(): IGenerate {
      let user = this.BindAllSecurityLevels("user",this.GetUser());
      let amount = this.BindAllSecurityLevels("amount",new SimpleProperty( PropertyType.PNumber));
      let payed = this.BindAllSecurityLevels("payed", new SimpleProperty(PropertyType.PBoolean));
      let payedChecked = this.BindAuthorLevel("payedChecked",new SimpleProperty( PropertyType.PBoolean));
      let chipin = new Composed("Chipin", false, [user, amount, payed, payedChecked]);
      return chipin;
    }

    private GetUser() {
      let name = this.BindAllSecurityLevels("name",new SimpleProperty( PropertyType.PString));
      let email = this.BindAllSecurityLevels("emailadress",new SimpleProperty( PropertyType.PString));
      let user = new Composed("User", false, [name, email]);
      return user;
    }

    private GetAllSecurityLevels(): [SecurityLevel] {
      return [this.authorReadWrite, this.userReadWrite];
    }

    private BindAllSecurityLevels(name:string , model: IGenerate): Binding {
      return new Binding(name, model, this.GetAllSecurityLevels());
    }

    private BindAuthorLevel(name, model: IGenerate): Binding {
      return new Binding(name, model, [this.authorReadWrite]);
    }

    private BindAuthorLevelUserRead(name: string, model: IGenerate): Binding {
      return new Binding(name, model, [this.authorReadWrite, this.userRead]);
    }


  }
}
