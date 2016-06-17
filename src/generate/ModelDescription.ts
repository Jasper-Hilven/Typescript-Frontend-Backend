/// <reference path="./index.gen.ts"/>

module generate {
  export interface IGenerate {
    GetType: ()=>string;
    GetAllSubTypes: ()=>Composed[];
    GetTypescriptType:()=>string;
  }
  export class Binding {
    public constructor(public name: string, public property: IGenerate, public securityLevels: [SecurityLevel]) {
    }
  }
  export class Composed implements IGenerate {

   public constructor(
     public typeName: string,
     public isGlobal: boolean,
     public subProperties: Binding[]) {
   }
    GetAllSubTypes():Composed[]{
       let subs = this.subProperties.map((c:Binding)=>(c.property.GetAllSubTypes())).reduce((a,b)=>(a.concat(b)));
       let uniques = <Composed[]> this.GetUniques(([<Composed>this]).concat(subs));
       return uniques;
    }
    static GetSType(){
     return "composed";
    }
    public GetTypescriptType(){
       return this.typeName;
    }
    GetUniques(arr:Composed[]):Composed[]{
    let names = arr.map(c => c.typeName);
    let check = function(item, pos, self):boolean {
        return names.indexOf(item.typeName) == pos;
    };
     return arr.filter(check);
    }

    public GetType(){
     return Composed.GetSType();
    }
  }
  export enum Capability {
    Read, ReadWrite
  }

  export class SecurityLevel {
    constructor(public name: string, public capability: Capability) {

    }
  }
  export enum PropertyType {
    PString, PNumber, PBoolean

  }
  export class SimpleProperty implements IGenerate {
   public GetTypescriptType(){
      return this.propertyType == PropertyType.PString? "string":
        (this.propertyType == PropertyType.PBoolean? "boolean":"Number");
   }

   GetAllSubTypes():[Composed]{
     return <[Composed]> [];
   }

    public constructor(public propertyType: PropertyType) {
    }

    public GetType():string{
     return SimpleProperty.GetSType();
    }

    static GetSType(){
     return "simple";
    }

  }
  export class ListProperty implements IGenerate {

    public constructor(public elements: IGenerate) {
    }

    public GetTypescriptType(){
       return this.elements.GetTypescriptType() + "[]";
    }


    GetAllSubTypes():Composed[]{
      return this.elements.GetAllSubTypes();
    }
    public GetType(){
     return ListProperty.GetSType();
    }
    static GetSType(){
     return "list";
    }
  }
}
