import UserModel = require("../model/UserModel");
import IUserModel = require("../model/interfaces/IUserModel");
import RepositoryBase = require("./base/RepositoryBase");
import UserSchema = require("../dataAccess/schemas/UserSchema");

class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

Object.seal(UserRepository);
export = UserRepository;