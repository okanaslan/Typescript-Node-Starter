import { Express } from "express";
import { serve, setup } from "swagger-ui-express";
import { Documentation } from "../documentation";

export class SwaggerUIExpress {
    static async serve(expressServer: Express) {
        const documentation = Documentation.get();
        expressServer.use("/api-docs", serve);
        expressServer.get("/api-docs", setup(documentation, { explorer: true }));
    }
}
