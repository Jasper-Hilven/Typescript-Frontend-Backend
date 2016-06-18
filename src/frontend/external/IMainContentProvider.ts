module frontend {
  export interface IMainContentProvider {
    GetMainContent(element: any): string;
  }



  export class DummyMainContentProvider implements IMainContentProvider {
    public GetMainContent(element: any): string {
      return "Dummy";
    }
  }
}
