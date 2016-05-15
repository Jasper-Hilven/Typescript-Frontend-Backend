/* tslint:disable */
module frontend {
  export interface IRouteObserver {
    LocationChanged(oldParts: string[], newParts: string[]);
  }
}
