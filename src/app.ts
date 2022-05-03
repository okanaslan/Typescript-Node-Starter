import { Mongoose } from "mongoose";
import { Database } from "./services/database/database";
import { Server } from "./server";
import { Logger } from "./services/logger/logger";
import { Documentation } from "./services/documentation/documentation";
import { Sentry } from "./services/logger/external/sentry";

export class App {
    static server = new Server();
    static database = new Mongoose();

    static start = async () => {
        const port = parseInt(process.env["PORT"] ?? "3000");

        try {
            await Database.connect();
            await Server.start(port);
            Sentry.initialize(Server.expressServer);
            Documentation.serve(Server.expressServer);
        } catch (error) {
            Logger.error(error as string);
            process.exit(1);
        }
    };

    static async stop() {
        await Database.close();
    }
}
