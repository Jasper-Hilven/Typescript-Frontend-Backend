/// <reference path="./index.ts"/>

module generate {
  export interface IGenerate {
    GetType: ()=>string;
    GetAllSubTypes: ()=>Composed[];
  }
  export class Binding {
    public constructor(public name: string, public property: IGenerate, public securityLevels: [SecurityLevel]) {
    }
  }
  export class Composed implements IGenerate {
    GetAllSubTypes():Composed[]{
       let subs = this.subProperties.map((c:Binding)=>(c.property.GetAllSubTypes())).reduce((a,b)=>(a.concat(b)));
       let uniques = <Composed[]> this.GetUniques(subs);
       return ([<Composed>this]).concat(uniques);
    }
    static GetSType(){
     return "composed";
    }
    GetUniques(arr:any[]):any[]{
    let check = function(item, pos, self):boolean {
        return self.indexOf(item) == pos;
    };
     return arr.filter(check);
    }
    public constructor(
      public typeName: string,
      public isGlobal: boolean,
      public subProperties: Binding[]) {
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
