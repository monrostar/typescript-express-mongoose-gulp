import IUserModel = require("./interfaces/IUserModel");

class UserModel {

  private _heroModel : IUserModel;

  constructor(heroModel : IUserModel) {
    this._heroModel = heroModel;
  }

  get name() : string {
    return this._heroModel.name;
  }

  get email() : string {
    return this._heroModel.email;
  }

  get amountPeopleSaved() : number {
    return this._heroModel.amountPeopleSaved;
  }


}
Object.seal(UserModel);
export =  UserModel;