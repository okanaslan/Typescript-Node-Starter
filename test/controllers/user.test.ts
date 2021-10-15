import { TestRunner } from "../testRunner";

import { IResponseBody } from "../../src/interfaces/Response";
import { IGetUserResponseData } from "../../src/entities/user/interfaces";

describe("# Dataset", () => {
    beforeAll(async () => {
        await TestRunner.initialize();
    });

    afterAll((done) => {
        TestRunner.deinitialize(done);
    });

    describe("Get /user", () => {
        const path = "/user";

        test("Should return a user.", async () => {
            const response = await TestRunner.get(`${path}?limit=1`);
            const body = response.body as IResponseBody<IGetUserResponseData>;
            expect(body.status.success).toBe(true);
            expect(body.data?.user.username).toBe("okanaslan");
        });
    });
});
