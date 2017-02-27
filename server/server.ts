require("source-map-support").install();

import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as fs from "fs-promise-tsc";

// Declare middleware
import TokenMiddleware from "./middleware/token.middleware";

// Declare routes
import { Index } from "./routes/";


export class Server {
    constructor(
        public app: express.Application,
        public assetMapPath: string = path.join(__dirname, "..", "assets", "webpack-assets.json")) {
    }

    assets: any;


    private expressConfig() {
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "pug");

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use("/client", express.static(path.join(__dirname, "../client")));
        this.app.use("/assets", express.static(path.join(__dirname, "../assets")));
        this.app.use("/css", express.static(path.join(__dirname, "../css")));
        this.app.use(favicon(path.join(__dirname, "../public/favicon.ico")));

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                // TODO: JSON response if requested in request
                res.render("error", {
                    message: err.message,
                    stack: JSON.stringify(err)
                });
            });
        } else {
            // production error handler
            // no stacktraces leaked to user
            this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || 500);
                // TODO: JSON response if requested in request
                res.render("error", {
                    message: err.message,
                    stack: JSON.stringify({"stacktrace": "Not available"})
                });
            });
        }
    }

    private routes(): void {
        const router: express.Router = express.Router();

        const routes = new Index();
        const tokenMiddleware = new TokenMiddleware();

        //home page
        router.get("/", tokenMiddleware.checkToken.bind(tokenMiddleware), routes.index.bind(routes));

        this.app.use(router);

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
            res.status(404);

            // TODO: JSON response if requested in request
            res.render("error", {
                message: "Hmmmm, couldn't find that.",
                stack: "N/A"
            });
        });
    }

    async init(): Promise<any> {
        // Load assets from expected location
        if (await fs.exists(this.assetMapPath)) {
            const fileData = await fs.readFile(this.assetMapPath, "utf8");
            if (fileData) {
                this.assets = JSON.parse(fileData);
                console.log(`Loaded asset map: ${fileData}`);
                this.app.set("assetMap", this.assets);
            }
        }

        this.expressConfig();
        this.routes();

        return Promise.resolve();
    }

    shutdown(): Promise<any> {
        // stop doing things
        return Promise.resolve();
    }
}