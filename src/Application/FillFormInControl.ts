import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import ICheckFunctionModule = require("../HComposed/Forms/ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFormStatusModule = require("../HComposed/Forms/HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus; import HFormStatusType = HFormStatusModule.HFormStatusType;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController; import RouteObserver = R.RouteObserver;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;
export class FillFormInControl implements ICheckFunction {
  CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
    var authorText = input["Author"];

    //public StatusType: HFormStatusType, public Message: string
    var ret: { [id: string]: HFormStatus; } = {};
    if (authorText.length == 0)
      ret["Author"] = new HFormStatus(HFormStatusType.Error, "Author name should not be empty");
    else
      ret["Author"] = new HFormStatus(HFormStatusType.OK, "Author name is filled in");

    return ret;
  }
}
