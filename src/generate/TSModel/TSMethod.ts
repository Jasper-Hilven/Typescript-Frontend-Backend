module generate {
    export class TSMethod {
        constructor(private name: string, private mParams: TSParameter[], private content: string[]) {
        }
        Print(commons: GeneratorCommons) {
            let methodHeader = "public " + this.name + " (";
            let constructorParams = this.mParams.map(sP => sP.Print());
            for (let i = 0; i < constructorParams.length - 1; i++) {
                constructorParams[i] = constructorParams[i] + ",";
            }
            let endHeader = "){";
            let endMethod = "}";
            return [methodHeader]
            .concat(commons.IndentCode(constructorParams))
            .concat([endHeader])
            .concat(commons.IndentCode(this.content))
            .concat([endMethod]);
        }
    }
}
