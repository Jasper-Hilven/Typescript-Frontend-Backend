import HFormStatusModule = require("./HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
export interface ICheckFunction {
  CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; };
}
