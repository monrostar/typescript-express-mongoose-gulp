import mongoose = require("mongoose");

interface IUserModel extends mongoose.Document {
  createdAt : Date;
  modifiedAt : Date;
  name : string;
  lol : string;
  email : string;
  password : string;
  achievements : string;
}

export = IUserModel;
