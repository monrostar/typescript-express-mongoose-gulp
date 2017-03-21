import cluster = require("cluster");
import os = require("os");
import { getServerConfigs } from "./config/env/index";
import * as winston from "winston";

class Cluster {
  private numCPUs : number;
  private numReqs : number;

  constructor() {
    let cpuCores = getServerConfigs().cpuCores;
    switch (true) {
      case (cpuCores === "*") :
        this.numCPUs = os.cpus().length;
        break;
      case (cpuCores > 0):
        this.numCPUs = cpuCores;
        break;
      default :
        this.numCPUs = os.cpus().length;
    }
    this.numReqs = 0;
    this.init();
  }


  protected init() : void {

    if (!cluster.isMaster) {
      return;
    }

    winston.log("info", `Master ${process.pid} is running`);

    // Fork workers.
    let pidToPort = {};
    let worker, port;
    for (let i = 0; i < this.numCPUs; i++) {

      //args: [ "--use", "https" ] or use https
      cluster.setupMaster({
        args: [ "--use", "http" ],
        silent: true
      });

      port                            = getServerConfigs().port + i;
      worker                          = cluster.fork({ port: port }); // Использует https
      pidToPort[ worker.process.pid ] = port;
    }

    console.log(pidToPort);

    cluster.on("online", (worker) => {
      //Если рабочий соединился с нами запишем это в лог!
      // logger.log(`Worker ${worker.id} running`);
      winston.log("info", `Worker ${worker.id} running`);
    });

    cluster.on("listening", (worker, address) => {
      winston.log("info", `Worker listening ${worker.process.pid} : ${address.port}`);
    });

    cluster.on("disconnect", (worker, code, signal) => {
      // В случае отключения IPC запустить нового рабочего

      // запишем в лог отключение сервера, что бы разработчики обратили внимание.
      winston.log("info", `Worker ${worker.id} died`);
      // logger.log(`Worker ${worker.id} died`);

      // Создадим рабочего
      //cluster.fork();
    });

    cluster.on("exit", (worker, code, signal) => {
      if (signal) {
        winston.log("info", `worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        winston.log("info", `worker exited with error code: ${code}`);
      } else {
        winston.log("info", "worker success!");
      }
    });
  }
}

Object.seal(Cluster);
export = Cluster;
