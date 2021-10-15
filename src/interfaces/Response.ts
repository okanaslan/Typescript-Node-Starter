import { Response } from "express";
import { IResponseStatus } from "./ResponseStatus";

export interface IResponseBody<DataType> {
    status: IResponseStatus;
    index?: number;
    data?: DataType;
}
export type IResponse<DataType> = Response<IResponseBody<DataType>>;
