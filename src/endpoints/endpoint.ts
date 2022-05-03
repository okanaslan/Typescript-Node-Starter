import { ParamsDictionary, Query } from "express-serve-static-core";
import { Request, Response } from "express";

import { createErrorResponse, createResponse } from "../utils/responseUtils";
import { RestHandler } from "./types/RestHandler";
import { RestMethod } from "./types/RestMethod";
import { ResponseBody } from "./types/ResponseBody";
import { Locals } from "./types/Locals";

export class EndPoint<DataType, ParameterType extends ParamsDictionary, BodyType, QueryType extends Query> {
    endpoint: string;
    method: RestMethod;
    handler: RestHandler<DataType, ParameterType, BodyType, QueryType>;

    constructor(endpoint: string, method: RestMethod, handler: RestHandler<DataType, ParameterType, BodyType, QueryType>) {
        this.endpoint = endpoint;
        this.method = method;
        this.handler = handler;
    }

    async call(request: Request<ParameterType, ResponseBody<DataType>, BodyType, QueryType, Locals>, response: Response<ResponseBody<DataType>, Locals>) {
        try {
            const data = await this.handler(request, response);
            response.json(createResponse(data));
        } catch (error) {
            response.json(createErrorResponse(error, { request, response }));
        }
    }
}
