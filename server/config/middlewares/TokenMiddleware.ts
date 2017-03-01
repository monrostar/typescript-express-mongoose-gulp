import { Request, Response, NextFunction } from "express";
import * as Jwt from "jsonwebtoken";
import Constants = require("../constants/constants");

class TokenMiddleware {

  public checkToken(req : Request, res : Response, next : NextFunction) : any {
    const token = req.header("authorization");

    if (!token) {
      return next({
        status : 403,
        message: "Forbidden. No token !"
      });
    }

    let tokenObj;
    try {
      tokenObj = Jwt.verify(token, Constants.APP_SECRET);
    } catch ({ message }) {
      return next({
        status: 400,
        message
      });
    }

    req.body.token = tokenObj;

    next();
  }
}

export = TokenMiddleware;