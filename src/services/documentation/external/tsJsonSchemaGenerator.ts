import { PathItemObject, SchemaObject } from "openapi3-ts";
import { createGenerator } from "ts-json-schema-generator";
import { DocumentationInput } from "../types/DocumentationInput";
import { DocumentationOutput } from "../types/DocumentationOutput";

export class TSJsonSchemaGenerator {
    private static generateSchema(type: string, filePath: string) {
        const config = {
            path: filePath,
            tsconfig: "./tsconfig.json",
        };

        const definitions = createGenerator(config).createSchema(type).definitions;
        if (definitions == null) {
            throw Error(`Cannot find any definitions for ${type} in ${filePath}`);
        }
        const schema = definitions[type];

        return schema as SchemaObject;
    }

    private static generateAdditionalSchemas(filePath: string): { [key: string]: SchemaObject } {
        const config = {
            path: filePath,
            tsconfig: "./tsconfig.json",
        };

        const definitions = createGenerator(config).createSchema().definitions;
        if (definitions == null) {
            throw Error(`Cannot find any definition in ${filePath}`);
        }
        return definitions as { [key: string]: SchemaObject };
    }

    static generateDocumentation(input: DocumentationInput): DocumentationOutput {
        const pathDoc: PathItemObject = {};

        const filePath = input.filePath;

        const splitedPath = filePath.split("/");
        const fileName = splitedPath.pop() || "unknown";
        const folderName = splitedPath.pop() || "unknown";

        const requestBodySchema = TSJsonSchemaGenerator.generateSchema("BodyType", filePath);
        const responseBodySchema = TSJsonSchemaGenerator.generateSchema("DataType", filePath);
        const additionalSchemas = TSJsonSchemaGenerator.generateAdditionalSchemas(filePath);

        pathDoc[input.method] = {
            operationId: fileName,
            tags: [folderName, ...(input.optional?.tags ?? [])],
            summary: input.optional?.summary,
            description: input.optional?.description,
            requestBody: {
                content: {
                    "application/json": {
                        schema: requestBodySchema,
                    },
                },
            },
            responses: {
                default: {
                    description: "Success Response",
                    content: {
                        "application/json": {
                            schema: responseBodySchema,
                        },
                    },
                },
            },
        };

        return { endpoint: input.endpoint, doc: pathDoc, additionalSchemas };
    }
}
