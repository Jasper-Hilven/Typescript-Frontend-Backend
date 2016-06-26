module frontend {
  export class HSelectPicker implements IHElement {
   htmlElement: HTMLElement;
   listeners = [];
   constructor(elements: string[]){
     this.htmlElement = document.createElement("select");
     this.htmlElement.classList.add("selectpicker");
     for(var eI in elements){
       let option = document.createElement("option");
       option.text= elements[eI];
       this.htmlElement.appendChild(option);
     }
     this.htmlElement.onchange = this.OnChange;
   }
    GetElement():HTMLElement{
      return this.htmlElement;
    }
    Register(func){
     this.listeners.push(func);
    }
    OnChange(ev){
      for(var i in this.listeners){
       let listener = this.listeners[i];
       listener(ev);
      }
    }
  }
}
