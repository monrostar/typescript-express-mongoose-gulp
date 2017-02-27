import * as express from "express";

export class Index {

  public index(req: express.Request, res: express.Response, next: express.NextFunction): any {
    res.render("index", { assets: req.app.get("assetMap") });
  }
}

