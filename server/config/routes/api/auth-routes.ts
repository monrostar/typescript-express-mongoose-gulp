import express = require("express");
import AuthController = require("../../../controllers/api/auth-controller");

class AuthRoutes {
  private _authController : AuthController;

  constructor() {
    this._authController = new AuthController();
  }

  get routes() : express.Router {
    let controller = this._authController;
    let router     = express.Router();

    router.get("/login", controller.token);
    router.post("/register", controller.create);

    return router;
  }


}

Object.seal(AuthRoutes);
export = AuthRoutes;