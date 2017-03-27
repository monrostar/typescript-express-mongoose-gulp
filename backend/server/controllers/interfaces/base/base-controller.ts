import IReadController = require("../common/read-controller");
import IWriteController = require("../common/write-controller");
import IBaseBusiness = require("../../../app/business/interfaces/base/i-base-business");

interface BaseController<T extends IBaseBusiness<Object>> extends IReadController, IWriteController {
}

export = BaseController;