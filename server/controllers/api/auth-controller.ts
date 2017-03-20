import e = require("express");
import IBaseController = require("../interfaces/base/base-controller");
import UserBusiness = require("../../app/business/user-business");
import IUserModel = require("../../app/model/interfaces/i-user-model");
import * as winston from "winston";

class AuthController implements IBaseController <UserBusiness> {
  retrieve : e.RequestHandler;
  findById : e.RequestHandler;
  update : e.RequestHandler;
  delete : e.RequestHandler;

  create(req : e.Request, res : e.Response, next : e.NextFunction) : void {
    try {
      let user : IUserModel = <IUserModel>req.body;
      let userBusiness      = new UserBusiness();
      userBusiness.create(user, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {

      winston.log("info", e);
      next({status: 400, "error": "error in your request" });

    }
  }

  token(req : e.Request, res : e.Response, next : e.NextFunction) : void {
    try {
      let email : string = req.params.email;
      let pwd : string   = req.params.password;
      let userBusiness   = new UserBusiness();
      let expression = {
        email: email
      };
      userBusiness.find(expression, (error, result) => {
        if (error) {
          res.json({ "error": "error" });
        } else {
          res.json({result});
        }
      });
    } catch (e) {
      winston.log("info", e);
      next({ status: 400, "error": "error in your request" });

    }
  }
}
export = AuthController;