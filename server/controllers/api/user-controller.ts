import express = require("express");
import IBaseController = require("../interfaces/base/base-controller");
import UserBusiness = require("../../app/business/user-business");
import * as winston from "winston";
import IUserModel = require("../../app/model/interfaces/i-user-model");

class UserController implements IBaseController <UserBusiness> {

  create(req : express.Request, res : express.Response) : void {

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
      res.send({ "error": "error in your request" });

    }
  }

  update(req : express.Request, res : express.Response) : void {
    try {
      let user : IUserModel = <IUserModel>req.body;
      let _id : string      = req.params._id;
      let userBusiness      = new UserBusiness();
      userBusiness.update(_id, user, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {
      winston.log("info", e);
      res.send({ "error": "error in your request" });

    }
  }

  delete(req : express.Request, res : express.Response) : void {
    try {

      let _id : string = req.params._id;
      let userBusiness = new UserBusiness();
      userBusiness.delete(_id, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {
      winston.log("info", e);
      res.send({ "error": "error in your request" });
    }
  }

  retrieve(req : express.Request, res : express.Response) : void {
    try {

      let userBusiness = new UserBusiness();
      userBusiness.retrieve((error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      winston.log("info", e);
      res.send({ "error": "error in your request" });
    }
  }

  findById(req : express.Request, res : express.Response) : void {
    try {
      let _id : string = req.params._id;
      let userBusiness = new UserBusiness();
      userBusiness.findById(_id, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      winston.log("info", e);
      res.send({ "error": "error in your request" });

    }
  }
}
export = UserController;