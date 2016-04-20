import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import ICheckFunctionModule = require("./ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;

export class DummyCheckFunction implements ICheckFunction {
  CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
    console.log("DummyCheck input");
    console.log(input);
    var ok = new HFormStatus(HFormStatusType.OK, "");
    var ret: { [id: string]: HFormStatus; } = {};
    for (var nameInput in input) {
      ret[nameInput] = ok;

    }
    console.log("DummyCheck output");
    console.log(ret);

    return ret;
  }

}
