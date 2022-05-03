import { NextFunction, Response, Request } from "express";

import { JSONUtils } from "../utils/JSONUtils";
import { Logger } from "../services/logger/logger";

export class LoggerMiddleware {
    static log(request: Request, _response: Response, next: NextFunction): void {
        const body = JSONUtils.stringfyD1(request.body);
        const query = JSONUtils.stringfyD1(request.query);
        const params = JSONUtils.stringfyD1(request.params);
        const log = `${request.method} ${request.path} BODY: ${body} Query: ${query} PARAMS: ${params}`;

        Logger.log(log);

        next();
    }
}
