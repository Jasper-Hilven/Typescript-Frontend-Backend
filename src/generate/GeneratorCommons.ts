/// <reference path="./index.ts"/>

module generate {
 export class GeneratorCommons {
  IndentCode(code: string[]) : string[]{
    return code.map(s => "  "+ s);
  }

  FlattenCodeLines(lines:string[][]): string[]{
   return lines.reduce((a,b) => a.concat(["",""]).concat(b))
  }
 }
}
