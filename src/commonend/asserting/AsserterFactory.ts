/* tslint:disable */
module commonend {
  export enum AssertLevel { Passive, Error, Warning, Info, Debug };

  export class AsserterFactory {
    asserters: { string: Asserter } // TODO StringToLogger

    log: Logger;
    constructor(lF: LoggerFactory) {
      this.log = lF.GetLogger("Assertions");
    }
    SetLevel(name: string, level: AssertLevel) {
      let asserter = this.GetAsserter(name);
      asserter.SetLevel(level);
    }
    GetAsserter(name): Asserter {
      let old = this.asserters[name];
      if (old) {
        return old;
      }
      let asserter = new Asserter(name, this, AssertLevel.Warning);
      this.asserters[name] = asserter;
      return asserter;
    }
    Warn(warning, name) {
      this.log.Error(this.BuildMessage(warning, name));
    }

    Info(info, name) {
      this.log.Error(this.BuildMessage(info, name));
    }

    Debug(debugInfo, name) {
      this.log.Error(this.BuildMessage(debugInfo, name));
    }

    Error(errorInfo, name) {
      this.log.Error(this.BuildMessage(errorInfo, name));
    }

    BuildMessage(message, name) {
      return "ASSERTFAILS: " + name + ": " + ": " + message;
    }
  }

  export class Asserter {
    info: boolean;
    warning: boolean;
    debug: boolean;
    error: boolean;

    constructor(public name: string, private factory: AsserterFactory, private level: AssertLevel) {
      this.SetLevel(level);
    }
    SetLevel(level: AssertLevel) {
      this.debug = level == AssertLevel.Debug;
      this.info = this.debug || level == AssertLevel.Info;
      this.warning = this.info || level == AssertLevel.Warning;
      this.error = this.warning || level == AssertLevel.Error;
      this.level = level;
    }

    RunAssertion(runFunc: () => boolean): boolean {
      try {
        return runFunc();
      } catch (e) {
        return false;
      }
    }
    Warn(message, warnFunc: () => boolean) {
      if (!this.warning) {
        return;
      }
      if (this.RunAssertion(warnFunc))
        return;
      this.factory.Warn(message, this.name);
    }

    Info(message, infoFunc: () => boolean) {
      if (!this.info) {
        return;
      }
      if (this.RunAssertion(infoFunc))
        return;
      this.factory.Info(message, this.name);
    }

    Debug(message, debugFunc: () => boolean) {
      if (!this.debug) {
        return;
      }
      if (this.RunAssertion(debugFunc))
        return;
      this.factory.Debug(message, this.name);
    }

    Error(message, errorFunc: () => boolean) {
      if (!this.Error) {
        return;
      }
      if (this.RunAssertion(errorFunc))
        return;
      this.factory.Error(message, this.name);
    }

  }

}
