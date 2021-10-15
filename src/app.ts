import { NodeEnvironment } from "./enums/NodeEnvironment";
import { config } from "dotenv";
import { Server } from "./server";

config();
const nodeEnvironment = NodeEnvironment[(process.env.NodeEnvironment ?? "local") as keyof typeof NodeEnvironment];
export const WordGame = new Server(nodeEnvironment);

WordGame.connectDatabase()
    .then(() => {
        WordGame.startServer();
    })
    .catch((error) => {
        console.error(error);
    });
