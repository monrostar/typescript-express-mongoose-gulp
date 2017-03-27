import express = require("express");
import { Request, Response, NextFunction } from "express";
import UserRoutes = require("../api/user-routes");
import AuthRoutes = require("../api/auth-routes");
import passport = require("passport");
class ApiRoutes {

  get routes(): express.Application {
    let app = express();
    let router = express.Router();

    app.use("/auth", new AuthRoutes().routes);

    app.use("/me", passport.authenticate("bearer", { session: false }), new UserRoutes().routes);

    return app;
  }
}
export = ApiRoutes;