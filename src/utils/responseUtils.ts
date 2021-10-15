import { IResponseBody } from "../interfaces/Response";

export function createResponse<DataType>(data?: DataType, index?: number, error?: Error): IResponseBody<DataType> {
    if (error == null) {
        return { status: { success: true }, data, index };
    } else {
        return { status: { success: false, reason: error.message } };
    }
}

export function createErrorResponse<DataType>(error: unknown): IResponseBody<DataType> {
    if (error instanceof Error) {
        return createResponse<DataType>(undefined, undefined, error);
    } else if (typeof error == "string") {
        return createResponse<DataType>(undefined, undefined, new Error(error));
    } else {
        console.log(`Unknown Error: ${error}`);
        return createResponse<DataType>(undefined, undefined, new Error(`Unknown Error: ${error}`));
    }
}
