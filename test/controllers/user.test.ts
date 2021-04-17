import { server } from "../../src/server";
import supertest from "supertest";

test("Get /user", async () => {
    const response = await supertest(server).get("/user").set("Accept", "application/json");
    expect(response.body.username).toBe("okanaslan");
});
