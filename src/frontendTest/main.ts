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
}
