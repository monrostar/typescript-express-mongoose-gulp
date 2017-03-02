import express = require("express");
import UserRoutes = require("../user-routes");
let app = express();
class BaseRoutes {

  get routes() {
    app.use("/user", new UserRoutes().routes);
    return app;
  }
}
export = BaseRoutes;