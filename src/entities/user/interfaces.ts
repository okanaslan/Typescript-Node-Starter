import { IRequest } from "../../interfaces/Request";
import { IResponse } from "../../interfaces/Response";
import { User } from "./model";

// GET /user
export type IGetUserRequest = IRequest<{}, {}, {}>;
export type IGetUserResponseData = {
    user: User;
};
export type IGetUserResponse = IResponse<IGetUserResponseData>;

// POST /user
export type IPostUserRequestBody = {};
export type IPostUserRequest = IRequest<{}, IPostUserRequestBody>;
export type IPostUserResponseData = {};
export type IPostUserResponse = IResponse<IPostUserResponseData>;
