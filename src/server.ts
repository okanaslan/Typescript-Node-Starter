import express from "express";
import { Server as httpServer } from "http";

import { SecurityMiddleware } from "./middlewares/securityMiddleware";
import { LoggerMiddleware } from "./middlewares/loggerMiddleware";
import { AuthMiddleware } from "./middlewares/authMiddleware";

import { EndPoint } from "./endpoints/endpoint";
import { Logger } from "./services/logger/logger";
import { RestMethod } from "./endpoints/types/RestMethod";

import { getUserEndpoint } from "./endpoints/user/getUsers";
import { loginEndpoint } from "./endpoints/auth/login";

export class Server {
    static expressServer = express();
    static httpServer?: httpServer;

    static start = async (port?: number): Promise<void> => {
        Server.expressServer.use(express.json());
        Server.expressServer.use(express.urlencoded({ extended: false }));

        // Middlewares
        Server.expressServer.use(LoggerMiddleware.log);
        Server.expressServer.use(SecurityMiddleware.check);
        Server.expressServer.use(AuthMiddleware.auth);

        // Endpoints
        Server.add(getUserEndpoint);
        Server.add(loginEndpoint);

        try {
            Server.httpServer = Server.expressServer.listen({ port }, () => Logger.info(`Service ready at port: ${port}`));
        } catch (error) {
            Logger.error(error as string);
            process.exit(1);
        }
    };

    static add(endpoint: EndPoint<any, any, any, any>) {
        switch (endpoint.method) {
            case RestMethod.get:
                Server.expressServer.get(getUserEndpoint.endpoint, getUserEndpoint.call);
                break;
            case RestMethod.put:
                Server.expressServer.put(getUserEndpoint.endpoint, getUserEndpoint.call);
                break;
            case RestMethod.post:
                Server.expressServer.post(getUserEndpoint.endpoint, getUserEndpoint.call);
                break;
            case RestMethod.delete:
                Server.expressServer.delete(getUserEndpoint.endpoint, getUserEndpoint.call);
                break;
        }
    }

    static stop(done: (error?: Error) => void) {
        Server.httpServer?.close((error) => {
            if (error == null) {
                Logger.info("Server closed");
                done();
            } else {
                Logger.error(error.message);
                done(error);
            }
        });
    }
}
