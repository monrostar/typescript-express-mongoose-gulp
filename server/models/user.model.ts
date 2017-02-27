import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./contracts/user.interface";
import * as Bcrypt from "bcrypt";

export interface IUserModel extends IUser, Document {
  comparePasswords() : boolean;
}

export const userSchema : Schema = new Schema({
  createdAt : Date,
  updatedAt : Date,
  name : { type : String, required : true, unique : true, index : true },
  lol : { type : String, required : false, sparse : true, lowercase : true },
  email : { type : String, required : true, unique : true, index : true },
  password : { type : String, required : true },
  achievements : { type : String, required : false }
});

userSchema.pre("save", next => {
  if (!this.isModified("password")) {
    return next();
  }

  this.password =  Bcrypt.hashSync(this.password, Bcrypt.genSaltSync(10));

  next();
});

userSchema.methods.comparePasswords = function (parameters : { password : string }) : boolean{
  let password = parameters.password;
  return Bcrypt.compareSync(password, this.password);
};

export const user : Model<IUserModel> = model<IUserModel>("User", userSchema);