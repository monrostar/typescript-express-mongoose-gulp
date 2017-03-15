import cluster = require("cluster");
import os = require("os");

class MiddlewareCluster {
    private numCPUs: number;
    private numReqs: number;

    constructor() {
        this.numCPUs = os.cpus().length;
        this.numReqs = 0;
    }

    protected messageHandler(parameters: {msg: any}) {
        let msg = parameters.msg;
        if (typeof (msg) !== "undefined" && msg.cmd && msg.cmd === "notifyRequest") {
            this.numReqs += 1;
        }
    }

    public init() : void {

        if (!cluster.isMaster) {
            return;
        }

        // Keep track of http requests
        setInterval(() => {
            console.log(`numReqs = ${this.numReqs}`);
        }, 1000);

        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < this.numCPUs; i++) {
            cluster.fork();
        }

        for (const id in cluster.workers) {
            if (cluster.workers.hasOwnProperty(id)) {
                console.log();
                cluster.workers[id].on("message", this.messageHandler);
            }
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

        cluster.on("disconnect", (err) => {
            // Worker has disconnected
        });

        cluster.on("listening", (address) => {
            // Worker is listening
        });

        console.log(`Worker ${process.pid} started`);
    }
}

Object.seal(MiddlewareCluster);
export = MiddlewareCluster;
