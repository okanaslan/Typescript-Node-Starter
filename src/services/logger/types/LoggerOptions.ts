import { Response, Request } from "express";

export interface LoggerOptions {
    silent?: boolean;
    userId?: string;
    request?: Request;
    response?: Response;
    args?: unknown;
}
