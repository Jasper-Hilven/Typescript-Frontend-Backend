import H = require("./../HBasics/HFactory"); import HFactory = H.HFactory;
import HI = require("../HBasics/IHElement"); import IHElement = HI.IHElement;
import DL = require("./../HComposed/DivLayout"); import DivLayout = DL.DivLayout;
import FC = require("./../HComposed/FormCreator"); import FormCreator = FC.FormCreator;
import R = require("./../Route/RouteController"); import RouteController = R.RouteController; import RouteObserver = R.RouteObserver;
import Nav = require("./../Route/Navigation"); import Navigator = Nav.Navigator; import NavigationElement = Nav.NavigationElement;

export class FillFormInControl extends FC.ICheckFunction {
  CheckValues(input: { [id: string]: string; }): { [id: string]: HFormStatus; };

}
}
