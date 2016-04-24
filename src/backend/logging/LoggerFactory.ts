export enum LogLevel { Passive, Error, Warning, Info, Debug };
export class LoggerFactory {
    logs: { string: Logger } // TODO StringToLogger
    constructor(private consoleToLog: Console) {
        this.logs = <{ string: Logger }>{};
    }

    SetLevel(name: string, level: LogLevel) {
        var log = this.GetLogger(name);
        log.SetLevel(level);
    }

    GetLogger(name): Logger {
        var oldLog = this.logs[name];
        if (oldLog) {
            return oldLog;
        }
        var logger = new Logger(name, this, LogLevel.Info);
        this.logs[name] = logger;
        return logger;
    }

    Warn(warning, name) {
        this.consoleToLog.warn(warning);
    }

    Info(info, name) {
        this.consoleToLog.info(info);
    }

    Debug(debugInfo, name) {
        this.consoleToLog.debug(debugInfo);
    }

    Error(errorInfo, name) {
        this.consoleToLog.error(errorInfo);
    }
}

export class Logger {
    private debug: boolean;
    private info: boolean;
    private warning: boolean;
    private error: boolean;

    constructor(public name: string, private factory: LoggerFactory, private level: LogLevel) {
        this.SetLevel(level);
    }

    SetLevel(level: LogLevel) {
        this.debug = level == LogLevel.Debug;
        this.info = this.debug || level == LogLevel.Info;
        this.warning = this.info || level == LogLevel.Warning;
        this.error = this.warning || level == LogLevel.Error;
        this.level = level;
    }

    Warn(info) {
        if (!this.warning) {
            return;
        }
        this.factory.Warn(info, this.name);
    }

    Info(info) {
        if (!this.info) {
            return;
        }
        this.factory.Info(info, this.name);
    }

    Debug(info) {
        if (!this.debug) {
            return;
        }
        this.factory.Debug(info, this.name);
    }

    Error(info) {
        if (!this.Error) {
            return;
        }
        this.factory.Error(info, this.name);
    }
}
