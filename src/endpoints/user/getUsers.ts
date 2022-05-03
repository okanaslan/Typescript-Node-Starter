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

const getUser = async (request: Request<ParameterType, BodyType, QueryType>, _response: Response): Promise<DataType> => {
    const { userId } = request.params;
    const user = await userModel.findById(userId);
    return { user };
};

export const getUserEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/user/:userId", RestMethod.get, getUser, __filename);
