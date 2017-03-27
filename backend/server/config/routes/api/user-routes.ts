import express = require("express");
import UserController = require("../../../controllers/api/user-controller");

let router = express.Router();
class UserRoutes {
  private _userController : UserController;

  constructor() {
    this._userController = new UserController();
  }

  get routes() {
    let controller = this._userController;
    router.get("/", (req : express.Request, res : express.Response, next : express.NextFunction) => {
      next({status: 500, message : "asdasd"});

      //res.json({ "asd": "asdas" });
    });
    //router.get("/", controller.retrieve);
    router.post("/", controller.create);
    router.put("/:_id", controller.update);
    router.get("/:_id", controller.findById);
    router.delete("/:_id", controller.delete);

    return router;
  }


}

Object.seal(UserRoutes);
export = UserRoutes;