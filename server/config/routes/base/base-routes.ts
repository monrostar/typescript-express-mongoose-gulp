import express = require("express");
import UserRoutes = require("../user-routes");
let app = express();
class BaseRoutes {

  get routes() {
    app.use("api/user", new UserRoutes().routes);
    app.use("api/auth", new UserRoutes().routes);
    return app;
  }
}
export = BaseRoutes;