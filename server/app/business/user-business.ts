import UserModel = require("../model/user-model");
import IUserModel = require("../model/interfaces/i-user-model");
import IUserBusiness = require("./interfaces/i-user-business");
import UserRepository = require("../repository/user-repository");


class UserBusiness implements IUserBusiness {
  private _userRepository : UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  create(item : IUserModel, callback : (error : any, result : any) => void) {
    this._userRepository.create(item, callback);
  }

  retrieve(callback : (error : any, result : any) => void) {
    this._userRepository.retrieve(callback);
  }

  update(_id : string, item : IUserModel, callback : (error : any, result : any) => void) {

    this._userRepository.findById(_id, (err, res) => {
      if (err) {
        callback(err, res);
      } else {
        this._userRepository.update(res._id, item, callback);
      }

    });
  }

  delete(_id : string, callback : (error : any, result : any) => void) {
    this._userRepository.delete(_id, callback);
  }

  findById(_id : string, callback : (error : any, result : IUserModel) => void) {
    this._userRepository.findById(_id, callback);
  }

}


Object.seal(UserBusiness);
export = UserBusiness;