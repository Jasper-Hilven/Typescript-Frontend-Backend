/// <reference path="./index.gen.ts"/>
module generate {
  export class ModelDefinitionGenerator {
    constructor(private commons: GeneratorCommons) { }
    GetClassDescription(descriptionClass: Composed) {

      let header = "export class " + descriptionClass.typeName + " {";
      let constructorHeader = "constructor(";
      let constructorParams = descriptionClass.subProperties.map(sP => sP.name + ": " + sP.property.GetTypescriptType());

      for (let i = 0; i < constructorParams.length - 1; i++) {
        constructorParams[i] = constructorParams[i] + ",";
      }
      let endConstructor = "){}";
      let classConstructor = [constructorHeader].concat(this.commons.IndentCode(constructorParams)).concat([endConstructor]);
      let footer = "}";
      let classDef = [header].concat(this.commons.IndentCode(classConstructor)).concat([footer]);
      return classDef;
    }
  }
}
