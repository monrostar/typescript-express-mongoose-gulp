require("source-map-support").install();
import MiddlewareCluster = require("./config/middlewares/base/middleware-cluster");
import Bin = require("./bin");

if (require("cluster").isMaster) {
  let middlewareCluster = new MiddlewareCluster();
} else {
  let bin = new Bin();
}




