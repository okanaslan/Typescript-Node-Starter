export interface DocumentationInput {
    endpoint: string;
    method: string;
    filePath: string;
    optional?: {
        tags?: string[];
        summary?: string;
        description?: string;
    };
}
