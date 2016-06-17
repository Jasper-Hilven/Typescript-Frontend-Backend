/// <reference path="./index.gen.ts"/>
module generate {
    export class CheckerGenerator {
        constructor(private commons:GeneratorCommons){}
        Generate(allTypes:Composed[]){
            let methods = allTypes.map((t)=> this.GenerateComposedChecker(t));
            let generatedClass = new generate.TSClass("generated","Checker",methods);


            return generatedClass;
        }

        GetComposedCheckerName(composed: Composed) {
            return "IsValid" + composed.typeName;
        }

        GenerateSimplePropertyCheckerCall(parentName: string,bindingName: string, sProperty: SimpleProperty) {
            if (sProperty.propertyType === PropertyType.PString) {
                return "((typeof " + parentName + "." + bindingName + ") === 'string')";
            }
            if (sProperty.propertyType === PropertyType.PNumber) {
                return "((typeof " + parentName + "." + bindingName + ") === 'number')";
            }
            if (sProperty.propertyType === PropertyType.PBoolean) {
                return "((typeof " + parentName + "." + bindingName + ") === 'boolean')";
            }
            throw "Undefined type detected";
        }

        GenerateCheckerCall(binding: Binding, parentName: string) {
            let generate = binding.property;
            if (generate.GetType() === Composed.GetSType()) {
                return "this."+ this.GetComposedCheckerName((<Composed>generate)) + "(" + parentName + "." + binding.name + ")";
            }
            if (generate.GetType() === SimpleProperty.GetSType()) {
                return this.GenerateSimplePropertyCheckerCall(parentName,binding.name,<SimpleProperty>generate);
            }
            if (generate.GetType() === ListProperty.GetSType()) {
                return "(" + parentName + "." + binding.name + " instanceof Array)";
            }
        }

        GenerateComposedChecker(composed: Composed) {
            let methodName = this.GetComposedCheckerName(composed);
            let paramName = composed.typeName.toLowerCase();
            let params = new TSParameter(paramName , composed.typeName);
            let content = ["let valid = "+paramName+";"];
            var bindings = composed.subProperties;
            for (let i = 0; i < bindings.length; i++) {
                content = content.concat(["valid = valid && " + this.GenerateCheckerCall(bindings[i],paramName) + ";"]);
            }
            content = content.concat("return valid;");
            return new TSMethod(methodName, [params], content);
        }


    }
}
