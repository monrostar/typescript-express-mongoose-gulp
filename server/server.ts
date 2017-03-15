require("source-map-support").install();
import Cluster = require("./cluster");
import Bin = require("./bin");

if (require("cluster").isMaster) {
  let cluster = new Cluster();
} else {
  let bin = new Bin();
}




