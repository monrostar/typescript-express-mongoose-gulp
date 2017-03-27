import express = require("express");
import UserRoutes = require("../api/user-routes");
import AuthRoutes = require("../api/auth-routes");
import ApiRoutes = require("./api-routes");
class BaseRoutes {

  get routes(): express.Application {
    let app = express();
    let router = express.Router();

    app.use((req, res, next) => {

      // notify master about the request
      process.send({ cmd: "notifyRequest", log: {message: "Some message to master process"} });

      next();
    });

    app.use(router.get("/", (req, res, next) => {
      res.render("index");
    }));

    app.use("/api", new ApiRoutes().routes);

    return app;
  }
}
export = BaseRoutes;