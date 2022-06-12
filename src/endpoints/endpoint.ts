import { ParamsDictionary, Query } from "express-serve-static-core";
import { Request, Response } from "express";

import { createErrorResponse, createResponse } from "../utils/responseUtils";
import { RestHandler } from "./types/RestHandler";
import { RestMethod } from "./types/RestMethod";
import { ResponseBody } from "./types/ResponseBody";
import { Locals } from "./types/Locals";
import { Documentation } from "../services/documentation/documentation";
import { DocumentationInput } from "../services/documentation/types/DocumentationInput";

export class EndPoint<DataType, ParameterType extends ParamsDictionary, BodyType, QueryType extends Query> {
    filePath: string;
    endpoint: string;
    method: RestMethod;
    handler: RestHandler<DataType, ParameterType, BodyType, QueryType>;

    static endpoints: EndPoint<any, any, any, any>[] = [];

    constructor(endpoint: string, method: RestMethod, handler: RestHandler<DataType, ParameterType, BodyType, QueryType>, filePath: string) {
        this.filePath = filePath;
        this.endpoint = endpoint;
        this.method = method;
        this.handler = handler;

        EndPoint.endpoints.push(this);
    }

    document() {
        const input: DocumentationInput = {
            endpoint: this.endpoint,
            method: this.method,
            filePath: this.filePath,
        };
        Documentation.add(input);
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
