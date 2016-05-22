module generate {
    export class TSParameter {
        constructor(private name: string, private pType: string) {
        }
        Print() {
            return this.name + ": " + this.pType;
        }
    }
}
