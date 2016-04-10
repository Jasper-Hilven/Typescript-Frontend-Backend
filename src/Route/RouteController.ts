export class RouteController {

  location: Location;
  listeners: RouteObserver[];

  constructor() {
    this.listeners = [];
    this.location = window.location;
    window.onhashchange = this.notify;
  }

  AddLocationChangedEventListener(observer: RouteObserver) {
    this.listeners.push(observer);
  }

  private splitToParts(url: string) {
    return url.substring(url.indexOf("#") + 1).split("/");
  }

  private notify(change: HashChangeEvent) {
    var newParts = this.splitToParts(change.newURL);
    var oldParts = this.splitToParts(change.oldURL);
    for (var nListener in this.listeners) {
      this.listeners[nListener].LocationChanged(oldParts, newParts);
    }
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
