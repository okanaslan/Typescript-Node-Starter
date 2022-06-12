import { readdirSync } from "fs";
import { PathItemObject, SchemaObject } from "openapi3-ts";
import { createGenerator } from "ts-json-schema-generator";
import { DocumentationInput } from "../types/DocumentationInput";
import { DocumentationOutput } from "../types/DocumentationOutput";

export class JsonSchemaGenerator {
    static createDocumentation(filePath: string): Record<string, SchemaObject> | undefined {
        const config = {
            path: filePath,
            tsconfig: "./tsconfig.json",
        };
        const definitions = createGenerator(config).createSchema().definitions;
        return definitions as Record<string, SchemaObject> | undefined;
    }

    static documentFolder(folderPath: string, definitions?: Record<string, SchemaObject>): Record<string, SchemaObject> | undefined {
        const files = readdirSync(folderPath);
        for (const file of files) {
            if (file.split(".")[1] == "ts") {
                try {
                    const filePath = `${folderPath}/${file}`;
                    const newDefinitions = JsonSchemaGenerator.createDocumentation(filePath);
                    definitions = { ...definitions, ...newDefinitions };
                } catch (error) {
                    // console.log(error);
                }
            } else if (file.split(".").length == 1) {
                const folder = file;
                definitions = JsonSchemaGenerator.documentFolder(`${folderPath}/${folder}`, definitions);
            }
        }
        return definitions;
    }

    private static generateSchema(type: string, filePath: string): SchemaObject | undefined {
        const config = {
            path: filePath,
            tsconfig: "./tsconfig.json",
        };

        const definitions = createGenerator(config).createSchema(type).definitions;
        if (definitions == null) {
            throw Error(`Cannot find any definitions for ${type} in ${filePath}`);
        }
        const schema = definitions[type];

        return schema as SchemaObject | undefined;
    }

    private static generateAdditionalSchemas(filePath: string): Record<string, SchemaObject> | undefined {
        const config = {
            path: filePath,
            tsconfig: "./tsconfig.json",
        };

        const definitions = createGenerator(config).createSchema().definitions;
        if (definitions == null) {
            throw Error(`Cannot find any definition in ${filePath}`);
        }
        return definitions as Record<string, SchemaObject> | undefined;
    }

    static generateDocumentation(input: DocumentationInput): DocumentationOutput {
        const pathDoc: PathItemObject = {};

        const filePath = input.filePath;

        const splitedPath = filePath.split("/");
        const fileName = splitedPath.pop() || "unknown";
        const folderName = splitedPath.pop() || "unknown";

        const requestBodySchema = JsonSchemaGenerator.generateSchema("BodyType", filePath);
        const responseBodySchema = JsonSchemaGenerator.generateSchema("DataType", filePath);
        const additionalSchemas = JsonSchemaGenerator.generateAdditionalSchemas(filePath);

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
