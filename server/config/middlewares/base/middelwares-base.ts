import express = require("express");
import session = require("express-session");
import memcached = require("connect-memcached");
import flash = require("connect-flash");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import path = require("path");
import passport = require("passport");
import passportLocal = require("passport-local");
import passportStrategy = require("passport-strategy");
import passportBearer = require("passport-http-bearer");

import MethodOverride = require("../method-override");
import BaseRoutes = require("../../routes/base/base-routes");
import * as serveFavicon from "serve-favicon";
import ErrorHandler = require("../error-handler");
import { getServerConfigs, getMemcachedConfigs, getSessionConfigs } from "../../env/index";
import UserBusiness = require("../../../app/business/user-business");
import UserModel = require("../../../app/model/user-model");
import UserRepository = require("../../../app/repository/user-repository");

class MiddlewaresBase {

  static get configuration() {
    let app = express();

    let sessionOptions = Object(getSessionConfigs());
    if (process.env.NODE_ENV === "production") {
      let MemcachedStore   = memcached(session);
      sessionOptions.store = new MemcachedStore(getMemcachedConfigs());
    }

    app.set("views", path.join(__dirname, "../../../../views"));
    app.set("view engine", "pug");

    app.use(morgan("tiny"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionOptions));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    // Global flash vars
    app.use((req : express.Request, res : express.Response, next : express.NextFunction) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg   = req.flash("error_msg");
      res.locals.error       = req.flash("error");
      next();
    });

    // TODO compression

    app.use(express.static(path.join(__dirname, "../../../../public")));
    //app.use(serveFavicon(path.join(__dirname, "../public/favicon.ico")));

    app.use(MethodOverride.configuration());

    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new passportBearer.Strategy((token, done) => {
      new UserRepository().find({ token: token }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }));

    app.use(new BaseRoutes().routes);

    let errorHandler = new ErrorHandler(app).init();

    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;