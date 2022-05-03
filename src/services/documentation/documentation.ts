import { Express } from "express";
import { OpenAPI3 } from "./external/openAPI3";
import { DocumentationInput } from "./types/DocumentationInput";

export class Documentation {
    static add(input: DocumentationInput) {
        OpenAPI3.add(input);
    }

    static get() {
        return OpenAPI3.get();
    }

    static serve(expressServer: Express) {
        OpenAPI3.serve(expressServer);
    }
}
