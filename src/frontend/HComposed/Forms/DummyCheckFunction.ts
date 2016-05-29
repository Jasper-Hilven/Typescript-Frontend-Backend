/* tslint:disable */
/// <reference path="./index.ts"/>
module frontend {
  export class DummyCheckFunction implements ICheckFunction {
    CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
      console.log("DummyCheck input");
      console.log(input);
      let ok = new HFormStatus(HFormStatusType.OK, "");
      let ret: { [id: string]: HFormStatus; } = {};
      for (let nameInput in input) {
        ret[nameInput] = ok;

      }
      console.log("DummyCheck output");
      console.log(ret);

      return ret;
    }

  }
}
