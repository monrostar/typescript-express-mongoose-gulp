import e = require("express");
import passport = require("passport");
import passportBearer = require("passport-http-bearer");
import UserRepository = require("../../app/repository/user-repository");

class PassportStrategy {

  constructor(private _app : e.Application) {}

  init() : this {

    this._app.use(passport.initialize());
    this._app.use(passport.session());

    passport.use(new passportBearer.Strategy((token, done) => {
      new UserRepository().find({ token: token }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    }));

    return this;
  }

}

export = PassportStrategy;