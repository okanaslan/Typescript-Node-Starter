import { EndPoint, Request, Response, RestMethod, Empty } from "../imports";
import { User, userModel } from "../../entities/user";

export type DataType = {
    user: User | null;
};
export type ParameterType = {
    userId: string;
};
export type BodyType = Empty;
export type QueryType = Empty;

const login = async (_request: Request<ParameterType, BodyType, QueryType>, response: Response): Promise<DataType> => {
    const { userId } = response.locals;
    const user = await userModel.findById(userId);
    return { user };
};

export const loginEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/auth/login", RestMethod.post, login, __filename);
