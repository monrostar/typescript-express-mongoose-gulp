import express = require("express");
import { Request, Response, NextFunction } from "express";
import UserRoutes = require("../user-routes");
import * as passport from "passport";
import AuthRoutes = require("../api/auth-routes");
class BaseRoutes {

  get routes(): express.Application {
    let app = express();
    let router = express.Router();
    app.use(router.get("/", (req, res, next) => {
      res.render("index");
    }));
    app.use("/api/user", new UserRoutes().routes);
    app.use("/api/auth", new AuthRoutes().routes);
    return app;
  }
}
export = BaseRoutes;