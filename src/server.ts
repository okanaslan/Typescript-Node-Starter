import { Connection } from "mongoose";
import express, { Express } from "express";
import { Server as HTTPServer } from "http";

import { router } from "./routes";
import { Database } from "./database";
import { NodeEnvironment } from "./enums/NodeEnvironment";

export class Server {
    nodeEnvironment: NodeEnvironment;

    expressApp: Express;
    httpServer?: HTTPServer;
    mongoConnection?: Connection;

    constructor(nodeEnvironment: NodeEnvironment) {
        this.nodeEnvironment = nodeEnvironment;
        this.expressApp = express();
        this.expressApp.use(express.json()); // for parsing application/json
        this.expressApp.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

        this.expressApp.use(router);
    }

    async startServer(port?: number) {
        switch (this.nodeEnvironment) {
            case NodeEnvironment.test:
                this.httpServer = this.expressApp.listen(() => {
                    console.info(`Express application listening at http://localhost`);
                });
                break;
            case NodeEnvironment.local:
                this.httpServer = this.expressApp.listen(port ?? 3000, "Localhost", () => {
                    console.info(`Express application listening at http://localhost:3000`);
                });
                break;
            default:
                this.httpServer = this.expressApp.listen(port ?? 3000, () => {
                    console.info(`${this.nodeEnvironment} Express application listening at port: ${port ?? 3000}.`);
                });
        }
    }

    async connectDatabase() {
        this.mongoConnection = await Database.connectDefault();
        console.info(`Database connected to ${this.mongoConnection.host}:${this.mongoConnection.port}/${this.mongoConnection.db.databaseName}`);
    }

    async stopServer(done: (error?: any) => void) {
        await this.mongoConnection?.close();
        this.httpServer?.close((error) => {
            if (error == null) {
                console.info("Server closed");
                done();
            } else {
                console.error(error);
                done(error);
            }
        });
    }
}
