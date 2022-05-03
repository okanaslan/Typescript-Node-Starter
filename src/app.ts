import { Mongoose } from "mongoose";
import { Database } from "./services/database/database";
import { Server } from "./server";
import { Logger } from "./services/logger/logger";
import { Documentation } from "./services/documentation/documentation";

export class App {
    static server = new Server();
    static database = new Mongoose();

    static start = async () => {
        const port = parseInt(process.env["PORT"] ?? "3000");

        try {
            await Database.connect();
            await Server.start(port);
            await Documentation.serve(Server.expressServer);
        } catch (error) {
            Logger.error(error);
            process.exit(1);
        }
    };

    static async stop() {
        await Database.close();
    }
}
