import express = require("express");

class ErrorHandler {

  constructor(public app : express.Application) {}

  init() {
    if (this.app.get("env") === "development") {
      this.app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message,
          stack: JSON.stringify(err)
        });
      });
    } else {
      this.app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message
        });
      });
    }
  }

}

export = ErrorHandler;

