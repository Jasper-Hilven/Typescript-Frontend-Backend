export class RouteController {

  location: Location;
  listeners: RouteObserver[];

  constructor() {
    this.listeners = [];
    this.location = window.location;
    window.onhashchange = this.createNotify();
  }

  AddLocationChangedEventListener(observer: RouteObserver) {
    this.listeners.push(observer);
  }

  splitToParts(url: string) {
    return url.substring(url.indexOf("#") + 1).split("/");
  }
  createNotify() {
    var me = this;
    var notify = function(change: HashChangeEvent) {
      var newParts = me.splitToParts(change.newURL);
      var oldParts = me.splitToParts(change.oldURL);
      for (var nListener in me.listeners) {
        me.listeners[nListener].LocationChanged(oldParts, newParts);
      }
    };
    return notify;

  }
  GetParts() {
    return this.splitToParts(window.location.hash);
  }
  Trigger() {
    var parts = this.GetParts();
    for (var nListener in this.listeners)
      this.listeners[nListener].LocationChanged(parts, parts);
  }
}
export interface RouteObserver {
  LocationChanged(oldParts: string[], newParts: string[]);
}
