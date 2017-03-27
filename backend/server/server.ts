require("source-map-support").install();
import Cluster = require("./cluster");
import Bin = require("./bin");

if (require("cluster").isMaster) {
  new Cluster();
} else {
  new Bin();
}




