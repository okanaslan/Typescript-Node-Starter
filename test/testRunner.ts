import supertest, { SuperTest, Test } from "supertest";
// import getPort from "get-port";

import { Server } from "../src/server";
import { NodeEnvironment } from "../src/enums/NodeEnvironment";

export class TestRunner {
    static server = new Server(NodeEnvironment.test);
    static token = "";

    static initialize = async () => {
        // const port = await getPort({ port: 3000 });

        await TestRunner.server.connectDatabase();
        await TestRunner.server.startServer();
    };

    static deinitialize = async (done: () => void) => {
        await TestRunner.server.stopServer(done);
    };

    static request = (): SuperTest<Test> => {
        return supertest(TestRunner.server.httpServer);
    };

    static get = (path: string) => {
        return TestRunner.request().get(path);
    };

    static post = (path: string) => {
        return TestRunner.request().post(path);
    };
}
