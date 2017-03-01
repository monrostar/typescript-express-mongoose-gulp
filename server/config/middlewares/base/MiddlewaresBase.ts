import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import path = require("path");

import MethodOverride = require("./../MethodOverride");
import BaseRoutes = require("./../../routes/base/BaseRoutes");
import ErrorHandler = require("../ErrorHandler");
import * as serveFavicon from "serve-favicon";


class MiddlewaresBase {

  static get configuration() {
    let app = express();
    app.use(morgan("tiny"));

    app.set("views", path.join(__dirname, "../views"));
    app.set("view engine", "pug");

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // TODO compression

    app.use(express.static(path.join(__dirname, "../public")));
    app.use("/client", express.static(path.join(__dirname, "../client")));
    app.use("/assets", express.static(path.join(__dirname, "../assets")));
    app.use("/css", express.static(path.join(__dirname, "../css")));
    //app.use(serveFavicon(path.join(__dirname, "../public/favicon.ico")));

    // TODO express-session

    app.use(MethodOverride.configuration());
    app.use(new BaseRoutes().routes);

    app.use(new ErrorHandler(app).init);
    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;