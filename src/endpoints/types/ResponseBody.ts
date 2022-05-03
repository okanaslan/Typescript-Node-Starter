import { ResponseStatus } from "./ResponseStatus";

export interface ResponseBody<DataType> {
    status: ResponseStatus;
    index?: number;
    data?: DataType;
}
