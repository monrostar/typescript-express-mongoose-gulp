interface ILogger {
  writeLogs(level: string, data: any): void;
  writeDebug(data: any): void;
}

export = ILogger;