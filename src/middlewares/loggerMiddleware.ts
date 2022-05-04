import { NextFunction, Response, Request } from "express";

import { JSONUtils } from "../utils/JSONUtils";
import { Logger } from "../services/logger/logger";

export class LoggerMiddleware {
    static log(request: Request, response: Response, next: NextFunction): void {
        const body = JSONUtils.stringfyD1(request.body);
        const query = JSONUtils.stringfyD1(request.query);
        const params = JSONUtils.stringfyD1(request.params);
        const headers = JSONUtils.stringfyD1(request.headers);
        const log = `${request.method} ${request.path} Body: ${body} Query: ${query} Params: ${params} Headers: ${headers}`;

        Logger.info(log, { request, response });

        next();
    }
}
