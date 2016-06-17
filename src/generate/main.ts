/// <reference path="./index.gen.ts"/>
module generate {
  export class MainGen {
    public GenerateCode() {
     let modelDescription = new ChipmentModelDescription();
     let commons = new GeneratorCommons();
     let checkerGenerator = new CheckerGenerator(commons);
     let definitionGenerator = new ModelDefinitionGenerator(commons);
     let allTypes = modelDescription.GetChipmentModel().GetAllSubTypes();
     let generatedCheckers = checkerGenerator.Generate(allTypes).Print(commons);
     let generatedDefinitions = commons.FlattenCodeLines(allTypes.map(t => definitionGenerator.GetClassDescription(t)));
     //console.log(generatedDefinitions);
     //console.log(generatedCheckers);

     }
  }
}
var main = new generate.MainGen();
main.GenerateCode();
