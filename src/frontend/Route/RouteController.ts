/* tslint:disable */
module frontend {
  export class RouteController {

    location: Location;
    listeners: IRouteObserver[];

    constructor() {
      this.listeners = [];
      this.location = window.location;
      window.onhashchange = this.createNotify();
    }

    AddLocationChangedEventListener(observer: IRouteObserver) {
      this.listeners.push(observer);
    }

    splitToParts(url: string) {
      return url.substring(url.indexOf("#") + 1).split("/");
    }
    createNotify() {
      let me = this;
      let notify = function(change: HashChangeEvent) {
        let newParts = me.splitToParts(change.newURL);
        let oldParts = me.splitToParts(change.oldURL);
        for (let nListener in me.listeners) {
          me.listeners[nListener].LocationChanged(oldParts, newParts);
        }
      };
      return notify;

    }
    GetParts() {
      return this.splitToParts(window.location.hash);
    }
    Trigger() {
      let parts = this.GetParts();
      for (let nListener in this.listeners) {
        this.listeners[nListener].LocationChanged(parts, parts);
      }
    }
  }
}
