import express = require("express");
import bodyParser = require("body-parser");
import morgan = require("morgan");
import path = require("path");

import MethodOverride = require("../method-override");
import BaseRoutes = require("../../routes/base/base-routes");
import * as serveFavicon from "serve-favicon";
import ErrorHandler = require("../error-handler");


class MiddlewaresBase {

  static get configuration() {
    let app = express();

    app.use(morgan("tiny"));

    app.set("views", path.join(__dirname, "../../../../views"));
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

    let errorHandler = new ErrorHandler(app).init();

    return app;
  }
}
Object.seal(MiddlewaresBase);
export = MiddlewaresBase;