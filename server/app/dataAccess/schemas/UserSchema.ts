import DataAccess = require("../DataAccess");
import IUserModel = require("../../model/interfaces/IUserModel");

let mongoose           = DataAccess.mongooseInstance;
let mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {

  static get schema() {
    var schema = mongoose.Schema({
      createdAt   : { type: Date, required: false },
      updatedAt   : { type: Date, required: false },
      name        : { type: String, required: true, unique: true, index: true },
      lol         : { type: String, required: false, sparse: true, lowercase: true },
      email       : { type: String, required: true, unique: true, index: true },
      password    : { type: String, required: true },
      achievements: { type: String, required: false }
    });

    return schema;
  }

}
let schema = mongooseConnection.model<IUserModel>("Users", UserSchema.schema);


//schema.pre("save", next => {
//  if (this._doc) {
//    let doc = <IUserModel>this._doc;
//    let now = new Date();
//
//    if (!doc.createdAt) {
//      doc.createdAt = now;
//    }
//    doc.modifiedAt = now;
//
//
//    if (!doc.isModified("password")) {
//      return next();
//    }
//    doc.password = Bcrypt.hashSync(doc.password, Bcrypt.genSaltSync(10));
//  }
//
//  next();
//  return this;
//});


export = schema;
