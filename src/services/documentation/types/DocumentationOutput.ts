import { PathItemObject, SchemaObject } from "openapi3-ts";

export interface DocumentationOutput {
    endpoint: string;
    doc: PathItemObject;
    additionalSchemas: { [key: string]: SchemaObject };
}
