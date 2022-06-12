import { JsonSchemaGenerator } from "../services/documentation/external/jsonSchemaGenerator";
import { SchemaObject } from "openapi3-ts";
import { readdirSync } from "fs";

function documentFolder(folderPath: string, definitions?: Record<string, SchemaObject>): Record<string, SchemaObject> | undefined {
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
            definitions = documentFolder(`${folderPath}/${folder}`, definitions);
        }
    }
    return definitions;
}

const definitions = documentFolder("./src");
console.log(definitions);
