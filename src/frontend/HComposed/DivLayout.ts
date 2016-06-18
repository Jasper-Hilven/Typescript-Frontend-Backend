/* tslint:disable */module frontend {
  export class DivLayout {
    hFactory: HFactory;
    constructor(hFactory: HFactory) {
      this.hFactory = hFactory;
      let a = 0;
    }

    CreateContainer() {
      let containerDiv = this.hFactory.GetClassedDiv(["container"]);
      containerDiv.element.style.maxWidth = "1250px";
      return containerDiv;
    }

    CreateJumbotron(title: string, leadText: string, thirdChild: IHElement) {
      let jumboDiv = this.hFactory.GetClassedDiv(["jumbotron"]);
      // JumboDiv.element.style.textAlign = "center"
      jumboDiv.element.style.borderBottom = "2px solid #e5e5e5"
      let titleTextElem = this.hFactory.GetText(title);
      let titleH1 = this.hFactory.GetH1(titleTextElem);
      jumboDiv.AddElement(titleH1);
      let leadTextElem = this.hFactory.GetText(leadText);
      let leadParam = this.hFactory.GetClassedParag(["lead"], leadTextElem);
      jumboDiv.AddElement(leadParam);
      thirdChild = (thirdChild) ? thirdChild : this.hFactory.GetText("");
      jumboDiv.AddElement(thirdChild);
      return jumboDiv;
    }

    GetLeftRightFlexDiv(leftElem: IHElement, rightElem: IHElement) {
      let parentDiv = this.hFactory.GetDiv();
      let style = parentDiv.element.style;
      style.display = "flex";
      style.flexDirection = "row";
      style.flexWrap = "nowrap";
      style.justifyContent = "center";
      style.alignItems = "center"
      parentDiv.AddElement(leftElem);
      parentDiv.AddElement(rightElem);
      return parentDiv;
    }
    GetUpDownFlexDiv(upElem, downElem) {
      let parentDiv = this.hFactory.GetDiv();
      let style = parentDiv.element.style;
      style.display = "flex";
      style.flexDirection = "column";
      style.flexWrap = "nowrap";
      style.justifyContent = "center";
      style.alignItems = "center";
      style.margin = "4";
      parentDiv.AddElement(upElem);
      parentDiv.AddElement(downElem);
      return parentDiv;
    }

    GetButton(text: string, action: any, btnstyle: string) {
      let ret = this.hFactory.GetButton(this.hFactory.GetText(text));
      this.hFactory.AddClasses(ret, ["btn", "btn-" + btnstyle]);
      this.hFactory.SetType(ret, "button");
      ret.SetAction(action);
      let style = ret.GetElement().style;
      style.margin = "10px";
      return ret;
    }

    GetFooter(text) {
      let hFactory = this.hFactory;
      let footer = hFactory.GetDivWithChild(hFactory.GetClassedFooter(["footer"], hFactory.GetParag(hFactory.GetText(text))));
      let style = footer.GetElement().style;
      style.marginTop = "42px";
      style.marginLeft = "10px";
      return footer;
    }


  }
}
