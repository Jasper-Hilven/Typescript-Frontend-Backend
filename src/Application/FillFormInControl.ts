import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import ICheckFunctionModule = require("../HComposed/Forms/ICheckFunction"); import ICheckFunction = ICheckFunctionModule.ICheckFunction;
import HFormStatusModule = require("../HComposed/Forms/HFormStatus"); import HFormStatus = HFormStatusModule.HFormStatus;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController; import RouteObserver = R.RouteObserver;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;

export class FillFormInControl extends ICheckFunction {
  CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; } {
    throw "NotYetImplemented";
  }
}
