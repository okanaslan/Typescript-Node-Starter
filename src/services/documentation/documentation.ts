import { Express } from "express";
import { OpenApiBuilder, SchemaObject } from "openapi3-ts";
import { SwaggerUIExpress } from "./external/swaggerUIExpress";

import { TSJsonSchemaGenerator } from "./external/tsJsonSchemaGenerator";

import { DocumentationInput } from "./types/DocumentationInput";
import { DocumentationOutput } from "./types/DocumentationOutput";

export class Documentation {
    static openAPI = new OpenApiBuilder({
        openapi: "3.0.0",
        info: {
            title: "API",
            summary: "Core Backend API",
            version: "1.0.0",
            contact: {
                name: "Okan Aslan",
            },
        },
        servers: [{ url: "http://localhost:{port}", description: "Local", variables: { port: { default: "3000" } } }],
        paths: {},
        tags: [{ name: "user", description: "User related endpoints" }],
        components: { schemas: {} },
    });

    private static addToSchemas(schemas: { [key: string]: SchemaObject }) {
        for (const key of Object.keys(schemas)) {
            const additionalSchema = schemas[key];
            if (additionalSchema != null) {
                Documentation.openAPI.addSchema(key, additionalSchema);
            }
        }
    }

    private static addToPath(doc: DocumentationOutput) {
        Documentation.openAPI.addPath(doc.endpoint, doc.doc);
    }

    static add(input: DocumentationInput) {
        const doc = TSJsonSchemaGenerator.generateDocumentation(input);
        Documentation.addToPath(doc);
        Documentation.addToSchemas(doc.additionalSchemas);
    }

    static get() {
        return Documentation.openAPI.getSpec();
    }

    static serve(expressServer: Express) {
        return SwaggerUIExpress.serve(expressServer);
    }
}
