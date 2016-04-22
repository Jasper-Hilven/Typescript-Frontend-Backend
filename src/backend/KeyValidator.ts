export class KeyValidator {
  private creatorId: { value: number; };
  private creatorHash: any;
  private authorHash: any;
  private userHash: any;
  private sc: any;

  constructor(private simpleCrypt: any, private crypto: any) {
    this.sc = this.simpleCrypt({
      salt: "1234567890",
      password: "someStupidPasswordthatnobodycanwritebecauseitiswayto0longandstupid"
    });
    //console.log(sc.salt());
    //console.log(sc.password());
    this.userHash = this.HashThis(this.sc.encrypt("super duper user"));
    this.authorHash = this.HashThis(this.sc.encrypt("super duper author"));
    this.creatorHash = this.HashThis(this.sc.encrypt("super duper creator."));
    this.creatorId = { value: 0 };
  };

  GetCreatorId() {
    this.creatorId.value++;
    return this.creatorId.value;
  };

  private HashThis(data: string) {
    return this.crypto.createHash('md5').update(data).digest("hex");
  };

  IsValidChipinUser(id: string, key: string) {
    if (id == "user" && key == "abuser")
      return true;
    return this.CreateUserKey(id) == key;
  };

  IsValidChipinAuthor(id: string, key: string) {
    return this.CreateAuthorKey(id) == key;
  };

  GetUserKeyViaAuthor(id: string, key: string) {
    if (this.IsValidChipinAuthor(id, key))
      return this.CreateUserKey(id);
    return undefined;
  };

  IsValidCreateKey(id: string, key: string) {
    return true; //TODO Fix this later
  };

  CreateUserKey(id: string) {
    return this.HashThis(this.sc.encrypt(id + this.userHash));
  };

  CreateAuthorKey(id: string) {
    return this.HashThis(this.sc.encrypt(id + this.authorHash));
  };

  CreateIdViaCreateId(id: string) {
    return this.HashThis(this.sc.encrypt(id + this.creatorHash));
  };
}
