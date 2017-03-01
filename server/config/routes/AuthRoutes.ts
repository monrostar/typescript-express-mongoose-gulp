import express = require("express");
import HeroController = require("../../controllers/UserController");

let router = express.Router();
class UserRoutes {
  private _heroController : HeroController;

  constructor() {
    this._heroController = new HeroController();
  }

  get routes() {
    let controller = this._heroController;
    router.get("/signin", controller.retrieve);
    router.post("/signup", controller.create);
    router.get("/token", controller.update);

    return router;
  }


}

Object.seal(UserRoutes);
export = UserRoutes;