module frontend {
  export interface IPageController {
    GetName(): string;
    CanHandle(args: string[]): P.Promise<boolean>;
    Handle(args: string[]): P.Promise<boolean>;
    GetElement(): IHElement;
  }

}
