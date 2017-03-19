import express = require("express");
import exphbs  = require('express-handlebars');
import session = require("express-session");
import memcached = require("connect-memcached");
import flash = require("connect-flash");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import path = require("path");
import passport = require("passport");
import passportStrategy = require("passport-strategy");

import MethodOverride = require("../method-override");
import BaseRoutes = require("../../routes/base/base-routes");
import * as serveFavicon from "serve-favicon";
import ErrorHandler = require("../error-handler");
import { getServerConfigs, getMemcachedConfigs, getSessionConfigs } from "../../env/index";
import User = require("../../../app/model/user-model");

class MiddlewaresBase {

  static get configuration() {
    let app = express();

    let sessionOptions = Object(getSessionConfigs());
    if (process.env.NODE_ENV === "production") {
      let MemcachedStore = memcached(session);
      sessionOptions.store = new MemcachedStore(getMemcachedConfigs());
    }

    app.set("views", path.join(__dirname, "../../../../views"));
    let hbs = exphbs.create({ /* config */ });
    app.engine('handlebars', hbs.engine);
    app.set("view engine", "handlebars");

    app.use(morgan("tiny"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session(sessionOptions));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // TODO compression

    app.use(express.static(path.join(__dirname, "../public")));
    app.use("/client", express.static(path.join(__dirname, "../client")));
    app.use("/assets", express.static(path.join(__dirname, "../assets")));
    app.use("/css", express.static(path.join(__dirname, "../css")));
    //app.use(serveFavicon(path.join(__dirname, "../public/favicon.ico")));

    app.use(MethodOverride.configuration());

    app.use(new BaseRoutes().routes);

    let errorHandler = new ErrorHandler(app).init();

    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;