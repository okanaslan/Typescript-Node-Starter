import { Express } from "express";
import { serve, setup } from "swagger-ui-express";

export class SwaggerUIExpress {
    static async serve(expressServer: Express, documentation: { [key: string]: any }) {
        expressServer.use("/api-docs", serve);
        expressServer.get("/api-docs", setup(documentation, { explorer: true }));
    }
}
