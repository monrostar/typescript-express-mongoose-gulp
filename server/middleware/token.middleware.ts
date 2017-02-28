import * as express from "express";
import * as Jwt from "jsonwebtoken";
import config from "../config/index";

export default class TokenMiddleware {

    public checkToken(req: express.Request, res: express.Response, next: express.NextFunction) : any {
        const token = req.header("authorization");

        if (!token) {
            return next({
                status  : 403,
                message : "Forbidden. No token !"
            });
        }

        let tokenObj;
        try {
            tokenObj = Jwt.verify(token, config.secret);
        } catch ({ message }) {
            return next({
                status : 400,
                message
            });
        }

        req.body.token = tokenObj;

        next();
    }

}