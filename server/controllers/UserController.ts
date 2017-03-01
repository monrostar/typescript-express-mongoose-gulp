import express = require("express");
import IBaseController = require("./interfaces/base/BaseController");
import UserBusiness = require("../app/business/UserBusiness");
import IUserModel = require("../app/model/interfaces/IUserModel");

class UserController implements IBaseController <UserBusiness> {

  create(req : express.Request, res : express.Response) : void {
    try {

      let hero : IUserModel = <IUserModel>req.body;
      let heroBusiness      = new UserBusiness();
      heroBusiness.create(hero, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {

      console.log(e);
      res.send({ "error": "error in your request" });

    }
  }

  update(req : express.Request, res : express.Response) : void {
    try {
      let hero : IUserModel = <IUserModel>req.body;
      let _id : string      = req.params._id;
      let heroBusiness      = new UserBusiness();
      heroBusiness.update(_id, hero, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {
      console.log(e);
      res.send({ "error": "error in your request" });

    }
  }

  delete(req : express.Request, res : express.Response) : void {
    try {

      let _id : string = req.params._id;
      let heroBusiness = new UserBusiness();
      heroBusiness.delete(_id, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send({ "success": "success" });
        }
      });
    } catch (e) {
      console.log(e);
      res.send({ "error": "error in your request" });
    }
  }

  retrieve(req : express.Request, res : express.Response) : void {
    try {

      var heroBusiness = new UserBusiness();
      heroBusiness.retrieve((error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      console.log(e);
      res.send({ "error": "error in your request" });
    }
  }

  findById(req : express.Request, res : express.Response) : void {
    try {
      var _id : string = req.params._id;
      var heroBusiness = new UserBusiness();
      heroBusiness.findById(_id, (error, result) => {
        if (error) {
          res.send({ "error": "error" });
        } else {
          res.send(result);
        }
      });
    } catch (e) {
      console.log(e);
      res.send({ "error": "error in your request" });

    }
  }
}
export = UserController;