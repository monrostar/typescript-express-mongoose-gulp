import express = require("express");

class ErrorHandler {

  constructor(private _app: express.Application) {}

  init() : any {

    this._app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {
      res.status(404);
      // TODO: JSON response if requested in request
      res.render("error", {
        message: "Hmmmm, couldn't find that.", stack: "N/A"
      });
    });

    if (this._app.get("env") === "development") {
      this._app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message, stack: JSON.stringify(err)
        });
      });
    } else {
      this._app.use((err : any, req : express.Request, res : express.Response, next : express.NextFunction) => {
        let { status = 500, message = "Server Error" } = err;
        res.status(status);
        // TODO: JSON response if requested in request
        res.json({
          message
        });
      });
    }

    return this;
  }

}


Object.seal(ErrorHandler);
export = ErrorHandler;

