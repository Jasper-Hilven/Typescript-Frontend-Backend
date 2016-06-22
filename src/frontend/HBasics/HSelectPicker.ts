module frontend {
  export class HSelectPicker implements IHElement {
   htmlElement: HTMLElement;
   constructor(elements: string[]){
     this.htmlElement = document.createElement("select");
     this.htmlElement.classList.add("selectpicker");
     for(var eI in elements){
       let option = document.createElement("option");
       option.text= elements[eI];
       this.htmlElement.appendChild(option);
     }
   }
    GetElement():HTMLElement{
      return this.htmlElement;
    }
  }
}
