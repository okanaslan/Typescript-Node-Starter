import { NextFunction, Response, Request } from "express";
import { NodeEnvironment } from "../enums/NodeEnvironment";
import { JSONUtils } from "../utils/JSONUtils";

export class LoggerMiddleware {
    static log(request: Request, _response: Response, next: NextFunction): void {
        const body = JSONUtils.stringfyD1(request.body);
        const query = JSONUtils.stringfyD1(request.query);
        const params = JSONUtils.stringfyD1(request.params);
        const log = `${request.method} ${request.path} BODY: ${body} Query: ${query} PARAMS: ${params}`;

        if (process.env.NodeEnvironment == NodeEnvironment[NodeEnvironment.development]) {
            console.info(log);
        }

        next();
    }
}
