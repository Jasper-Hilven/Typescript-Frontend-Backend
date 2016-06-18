
/// <reference path="./index.gen.ts"/>
declare let it: any;
declare let describe: any;
declare let expect: any;
declare let toEqual: any;

module frontendTest {
  export class SimpleTestClass {

  }
  it("should compare SME strings", function() {
    expect("abc").toEqual("abc");
    expect("15").toEqual("15");
  });
  it("should compare MORARRARA strings", function() {
    expect("abc").toEqual("abc");
    expect("15").toEqual("15");
  });
  it("Should be able to construct the frontend", function() {
    //(new frontend.AppFactory()).BuildApp(new frontend.DummySliderProvider(), frontend.Dummy.DatePickerProvider);
  });

}
