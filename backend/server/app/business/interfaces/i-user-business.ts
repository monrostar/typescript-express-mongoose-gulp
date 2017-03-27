import IBaseBusiness = require("./base/i-base-business");
import IUserModel = require("../../model/interfaces/i-user-model");

interface IUserBusiness extends IBaseBusiness<IUserModel> {

}


export = IUserBusiness;