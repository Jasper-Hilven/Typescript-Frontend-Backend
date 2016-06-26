module frontend {
  export class HSelectPicker implements IHElement {
   htmlElement: HTMLSelectElement;
   listeners = [];
   constructor(elements: string[]){
     this.htmlElement = document.createElement("select");
     this.htmlElement.classList.add("selectpicker");
     for(var eI in elements){
       let option = document.createElement("option");
       option.text= elements[eI];
       this.htmlElement.appendChild(option);
     }
     this.htmlElement.onchange = this.OnChange(this);
   }
    GetElement():HTMLElement{
      return this.htmlElement;
    }
    Register(func){
     this.listeners.push(func);
    }
    OnChange(me){
     return (ev)=> {
     console.log("SelectPicker got event");
     var text = me.htmlElement.options[me.htmlElement.selectedIndex].text;
     console.log(ev);
      for(var i in me.listeners){
       let listener = me.listeners[i];
       listener(text);
      }
     }
    }
  }
}
