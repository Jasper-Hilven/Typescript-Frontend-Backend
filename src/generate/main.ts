/// <reference path="./index.ts"/>
module generate {
  export class MainGen {
    public GenerateCode() {
      let checkerGenerator = new CheckerGenerator();
      let generated = checkerGenerator.Generate();

      console.log(generated);
    }
  }
}
var main = new generate.MainGen();
main.GenerateCode();
