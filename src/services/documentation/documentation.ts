import { Express } from "express";
import { OpenAPI3 } from "./external/openAPI3";
import { SwaggerUIExpress } from "./external/swaggerUIExpress";
import { DocumentationInput } from "./types/DocumentationInput";

export class Documentation {
    static create() {
        OpenAPI3.documentEveryting();
    }

    static add(input: DocumentationInput) {
        OpenAPI3.add(input);
    }

    static get() {
        return OpenAPI3.get();
    }

    static serve(expressServer: Express) {
        const documentation = Documentation.get();
        SwaggerUIExpress.serve(expressServer, documentation);
    }
}
