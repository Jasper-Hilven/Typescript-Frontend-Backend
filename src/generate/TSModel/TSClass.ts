module generate{
  export class TSClass {
    constructor(private moduleName: string, private className: string, private content: TSMethod[]){
    }
    Print(commons: GeneratorCommons){
     let printedMethods = commons.IndentCode(
      commons.FlattenCodeLines(this.content.map(c => c.Print(commons))));
     return ["module " + this.moduleName + " {","  export class "+this.className + "{ "]
     .concat(printedMethods).concat(["  }","}"]);
    }
  }
}
