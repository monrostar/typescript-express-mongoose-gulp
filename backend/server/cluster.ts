import cluster = require("cluster");
import os = require("os");
import path = require("path");
import fs = require("fs");
import { getServerConfigs } from "./config/env/index";
import winston = require("winston");
import Constants = require("./config/constants/constants");

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

    let logDirectory = path.join(__dirname, "../logs");
    // ensure log directory exists
    if (fs.existsSync(logDirectory) === false) {
      fs.mkdirSync(logDirectory);
    }

    let winstonLogger = new winston.Logger({
      transports       : [ new (winston.transports.File)({
        levels          : process.env.NODE_ENV === "development" ? [ "debug" ] : [ "info", "error", "warn" ],
        filename        : logDirectory + "/error-log.log",
        handleExceptions: true,
        json            : true,
        maxsize         : 5242880, //5MB
        maxFiles        : 5,
        colorize        : false,
        timestamp       : true
      }), new (winston.transports.Console)({
        levels          : process.env.NODE_ENV === "development" ? [ "debug" ] : [ "info", "error", "warn" ],
        handleExceptions: true,
        json            : false,
        colorize        : true
      }) ], exitOnError: false
    });


    // Fork workers.
    let numberOfRequests = 0;
    let pidToPort        = {};
    let worker, port;
    for (let i = 0; i < this.numCPUs; i++) {

      //args: [ "--use", "https" ] or use https
      cluster.setupMaster({
        args: [ "--use", "http" ], silent: true
      });

      port                            = getServerConfigs().port + i;
      worker                          = cluster.fork({ port: port }); // Использует https
      pidToPort[ worker.process.pid ] = port;
    }

    cluster.on("message", (worker : cluster.Worker, msg : any) => {

      if (msg.cmd && msg.cmd === "notifyRequest") {
        numberOfRequests += 1;
        winstonLogger.info(`Request count: ${numberOfRequests}`);
      }

      switch (msg.type) {
        case Constants.LOGGER_CONSOLE:
          console.log(msg.level, msg.data);
          break;
        case Constants.LOGGER_WINSTON:
          winstonLogger.log(msg.level, msg.data);
          break;
        default:
          break;
      }

    });

    cluster.on("online", (worker) => {
      //Если рабочий соединился с нами запишем это в лог!
      winstonLogger.log("info", `Worker ${worker.id} running`);
    });

    cluster.on("listening", (worker, address) => {
      winstonLogger.log("info", `Worker listening ${worker.process.pid} : port ${address.port}`);
    });

    cluster.on("disconnect", (worker, code, signal) => {
      // В случае отключения IPC запустить нового рабочего

      // запишем в лог отключение сервера, что бы разработчики обратили внимание.
      winstonLogger.log("info", `Worker ${worker.id} died`);

      // Create a worker
      cluster.fork();
    });

    cluster.on("exit", (worker, code, signal) => {
      if (signal) {
        winstonLogger.log("info", `worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        winstonLogger.log("info", `worker exited with error code: ${code}`);
      } else {
        winstonLogger.log("info", "worker success!");
      }
    });
  }
}

Object.seal(Cluster);
export = Cluster;
