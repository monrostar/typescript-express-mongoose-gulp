import cluster = require("cluster");
import os = require("os");

class MiddlewareCluster {
    private numCPUs: number;
    private numReqs: number;

    constructor() {
        this.numCPUs = os.cpus().length;
        this.numReqs = 0;
    }

    public init() : void {

        if (!cluster.isMaster) {
            return;
        }

        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < this.numCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            if (signal) {
                console.log(`worker was killed by signal: ${signal}`);
            } else if (code !== 0) {
                console.log(`worker exited with error code: ${code}`);
            } else {
                console.log("worker success!");
            }
        });

        cluster.on("disconnect", (worker, code, signal) => {
            // В случае отключения IPC запустить нового рабочего (мы узнаем про это подробнее далее)
            // logger.log(`Worker ${worker.id} died`);
            // запишем в лог отключение сервера, что бы разработчики обратили внимание.
            // cluster.fork();
            // Создадим рабочего
        });

        cluster.on("online", (worker) => {
            //Если рабочий соединился с нами запишем это в лог!
            // logger.log(`Worker ${worker.id} running`);
        });
        cluster.on("listening", (address) => {
            // Worker is listening
        });
    }
}

Object.seal(MiddlewareCluster);
export = MiddlewareCluster;
