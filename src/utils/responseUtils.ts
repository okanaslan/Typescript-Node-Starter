import { LoggerOptions } from "../services/logger/types/LoggerOptions";
import { ResponseBody } from "../endpoints/types/ResponseBody";
import { Logger } from "../services/logger/logger";

export function createResponse<DataType>(data?: DataType, index?: number, error?: Error): ResponseBody<DataType> {
    if (error == null) {
        return { status: { success: true }, data, index };
    } else {
        return { status: { success: false, reason: error.message } };
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createErrorResponse(error: unknown, options?: LoggerOptions): ResponseBody<any> {
    Logger.error(error as string, options);
    if (error instanceof Error) {
        return createResponse<unknown>(undefined, undefined, error);
    } else if (typeof error == "string") {
        return createResponse<unknown>(undefined, undefined, new Error(error));
    } else {
        Logger.error(`Unknown error structure error: ${error}`);
        return createResponse<unknown>(undefined, undefined, new Error(`Unknown error: ${error}`));
    }
}
