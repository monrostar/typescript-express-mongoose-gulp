import Read = require("../common/i-read");
import Write = require("../common/i-write");
interface IBaseBusiness<T> extends Read<T>, Write<T> {
}
export = IBaseBusiness;