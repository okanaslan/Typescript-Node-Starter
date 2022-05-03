import { Locals } from "./Locals";

export type RestHandler<DataType, ParameterType, BodyType, QueryType> = (
    request: { params: ParameterType; body: BodyType; query: QueryType },
    response: { locals: Locals }
) => Promise<DataType>;
