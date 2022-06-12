import { OpenApiBuilder, SchemaObject } from "openapi3-ts";

import { JsonSchemaGenerator } from "./jsonSchemaGenerator";

import { DocumentationInput } from "../types/DocumentationInput";
import { DocumentationOutput } from "../types/DocumentationOutput";
import { EndPoint } from "../../../endpoints/endpoint";

export class OpenAPI3 {
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
        tags: [
            { name: "user", description: "User related endpoints" },
            { name: "auth", description: "Auth related endpoints" },
        ],
        components: { schemas: {} },
    });

    private static addToSchemas(schemas: Record<string, SchemaObject>) {
        for (const key of Object.keys(schemas)) {
            const additionalSchema = schemas[key];
            if (additionalSchema != null) {
                OpenAPI3.openAPI.addSchema(key, additionalSchema);
            }
        }
    }

    private static addToPath(doc: DocumentationOutput) {
        OpenAPI3.openAPI.addPath(doc.endpoint, doc.doc);
    }

    static add(input: DocumentationInput) {
        const doc = JsonSchemaGenerator.generateDocumentation(input);
        OpenAPI3.addToPath(doc);
        if (doc.additionalSchemas != null) {
            OpenAPI3.addToSchemas(doc.additionalSchemas);
        }
    }

    static documentEveryting() {
        const definitions = JsonSchemaGenerator.documentFolder("./src");
        if (definitions != null) {
            OpenAPI3.addToSchemas(definitions);
        }
        EndPoint.endpoints.forEach((endpoint) => {
            endpoint.document();
        });
    }

    static get() {
        const doc = OpenAPI3.openAPI.getSpec();
        if (doc.components?.schemas != null) {
            doc.definitions = doc.components.schemas;
            doc.components.schemas = undefined;
        }
        return doc;
    }
}
