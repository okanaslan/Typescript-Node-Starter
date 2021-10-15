import { Request } from "express";
import { Query, ParamsDictionary } from "express-serve-static-core";

export interface IRequest<ParameterType extends ParamsDictionary = {}, BodyType = {}, QueryType extends Query = {}>
    extends Request<ParameterType, unknown, BodyType, QueryType> {
    token?: string;
}
