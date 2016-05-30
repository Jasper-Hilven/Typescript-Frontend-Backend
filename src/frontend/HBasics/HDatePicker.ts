declare var $;
/*
<div class="input-group date">
  <input type="text" class="form-control"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
</div>
*/

module frontend {
    export class HDatePicker implements IHElement {
        private element: HTMLDivElement;
        private datePicker: any;
        constructor() {
            this.element = document.createElement("div");
            this.element.classList.add("input-group");
            this.element.classList.add("date");
            let inputELement = document.createElement("input");
            inputELement.type = "text";
            inputELement.classList.add("form-control");
            this.element.appendChild(inputELement);
            let spanElement = document.createElement("span");
            spanElement.classList.add("input-group-addon");
            let iSpanElement = document.createElement("i");
            iSpanElement.classList.add("glyphicon");
            iSpanElement.classList.add("glyphicon-th");
            spanElement.appendChild(iSpanElement);
            this.element.appendChild(spanElement);
            $(this.element).datepicker({});
        }
        public GetElement() {
            return this.element;
        }

        public SetAction(action) {
          this.element.onchange = function() { action(); };
        }

        public GetDate() {
            return $(this.element).datepicker('getDate');
        }
    }
}
