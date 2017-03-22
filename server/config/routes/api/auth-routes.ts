import e = require("express");
import AuthController = require("../../../controllers/api/auth-controller");
import passport = require("passport");

class AuthRoutes {
  private _authController : AuthController;

  constructor() {
    this._authController = new AuthController();
  }

  get routes() : e.Router {
    let controller = this._authController;
    let router     = e.Router();

    router.get("/login", controller.token);

    router.post("/register", controller.create);

    return router;
  }


}

Object.seal(AuthRoutes);
export = AuthRoutes;