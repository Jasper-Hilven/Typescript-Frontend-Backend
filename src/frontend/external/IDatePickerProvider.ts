module frontend {
  export interface IDatePickerProviderResult {
    datepicker(element: any): string;
  }

  export type IDatePickerProvider = (element: any) => IDatePickerProviderResult;

  export class Dummy {
    static DatePickerProvider = function(element: any) {
      return new DummyDatePickerProviderResult();
    }
  }

  export class DummyDatePickerProviderResult implements IDatePickerProviderResult {
    public datepicker(element: any): string {
      return "Dummy";
    }
  }
}
