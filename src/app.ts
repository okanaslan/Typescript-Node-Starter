import { Database } from "./services/database/database";
import { Server } from "./server";
import { Logger } from "./services/logger/logger";
import { Documentation } from "./services/documentation/documentation";

/**
 * Application start point
 */
export class App {
    static server = new Server();

    static start = async () => {
        const port = parseInt(process.env["PORT"] ?? "3000");

        try {
            await Database.initialize();
            await Server.start(port);

            Documentation.create();
            Logger.initialize(Server.expressServer);
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
