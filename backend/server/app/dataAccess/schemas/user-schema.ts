import DataAccess = require("../data-access");
import IUserModel = require("../../model/interfaces/i-user-model");
import Bcrypt = require("bcrypt");

let mongoose           = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

  static get schema() {
    let schema = mongoose.Schema({
      createdAt   : { type: Date, required: false },
      updatedAt   : { type: Date, required: false },
      name        : { type: String, trim: true, required: true, index: {unique: true, dropDups: true} },
      lol         : { type: String, trim: true, required: false, sparse: true, lowercase: true, index: {unique: true, dropDups: true} },
      email       : {
        email    : { type: String, trim: true, required: true, unique: true, index: {unique: true, dropDups: true}},
        confirmed: { type: Boolean, required: false, default: false},
        updatedAt: { type: Date, required: false },
      },
      password    : { type: String, required: true },
      achievements: { type: String, required: false },
      token       : {
        token     : { type: String, trim: true, required: false},
        expiration: { type: Date, required: false}
      }
    });

    schema.pre("save", function (next : any) {
      if (this._doc) {
        let doc = <IUserModel>this._doc;
        let now = new Date();

        if (!doc.createdAt) {
          doc.createdAt = now;
        }

        doc.modifiedAt = now;

        if (!this.isModified("password")) {
          return next();
        }

        doc.password = Bcrypt.hashSync(doc.password, Bcrypt.genSaltSync(10));
      }

      next();
    });

    return schema;
  }

}

let schema = mongooseConnection.model<IUserModel>("Users", UserSchema.schema);
export = schema;
