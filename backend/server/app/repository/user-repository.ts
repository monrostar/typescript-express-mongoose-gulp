import UserModel = require("../model/user-model");
import IUserModel = require("../model/interfaces/i-user-model");
import RepositoryBase = require("./base/repository-base");
import UserSchema = require("../dataAccess/schemas/user-schema");

class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}

Object.seal(UserRepository);
export = UserRepository;