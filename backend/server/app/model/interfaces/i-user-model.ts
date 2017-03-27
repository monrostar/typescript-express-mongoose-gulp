import mongoose = require("mongoose");

interface IUserModel extends mongoose.Document {
  createdAt : Date;
  modifiedAt : Date;
  name : string;
  lol : string;
  email : {
    email : string, confirmed : boolean, updatedAt : Date
  };
  password : string;
  achievements : string;
  token : {
    token : string, expiration : Date,
  };
}

export = IUserModel;
