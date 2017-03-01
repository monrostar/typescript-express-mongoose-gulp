
import IUserModel = require("../../model/interfaces/IUserModel");
import IBaseBusiness = require("./base/IBaseBusiness");

interface IUserBusiness extends IBaseBusiness<IUserModel> {

}


export = IUserBusiness;