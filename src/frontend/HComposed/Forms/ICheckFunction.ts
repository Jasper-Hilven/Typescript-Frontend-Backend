/// <reference path="./index.gen.ts"/>
/* tslint:disable */
module frontend {
  export interface ICheckFunction {
    CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; };
  }

}
