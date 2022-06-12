import { EndPoint, Request, RestMethod, Empty } from "../imports";
import { User, userCollection } from "../../entities/user";

export type DataType = {
    user: User | null;
};
export type ParameterType = {
    userId: string;
};
export type BodyType = Empty;
export type QueryType = Empty;

const getUser = async (request: Request<ParameterType, BodyType, QueryType>): Promise<DataType> => {
    const { userId } = request.params;
    const user = (await userCollection.findOne({ id: userId })) as User | null;
    return { user };
};

export const getUserEndpoint = new EndPoint<DataType, ParameterType, BodyType, QueryType>("/user/:userId", RestMethod.get, getUser, __filename);
