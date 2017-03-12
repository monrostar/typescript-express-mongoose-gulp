import express = require("express");
import UserController = require("../../controllers/user-controller");

let router = express.Router();
class AuthRoutes {
  private _authController : UserController;

  constructor() {
    this._authController = new UserController();
  }

  get routes() {
    let controller = this._authController;
    router.get("/", (req : express.Request, res : express.Response, next : express.NextFunction) => {
      next({status: 500, message : "asdasd"});

      //res.json({ "asd": "asdas" });
    });
    //router.get("/signin", controller.create);
    //router.post("/signup", controller.update);
    //router.get("/token", controller.findById);

    return router;
  }


}

Object.seal(AuthRoutes);
export = AuthRoutes;