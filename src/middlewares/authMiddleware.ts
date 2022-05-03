import { NextFunction, Request, Response } from "express";

import { createErrorResponse } from "../utils/responseUtils";
import { Logger } from "../services/logger/logger";
import { Auth } from "../services/auth/auth";

export class AuthMiddleware {
    static async auth(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const skip =
                request.path == "/" ||
                request.path == "/user/login" ||
                request.path == "/user/register" ||
                (request.method == "GET" && request.path.split("/")[1] == "project") ||
                request.path.split("/")[1] == "api-docs";
            if (!skip) {
                const token = request.headers["token"] as string | undefined;
                if (token == null) throw new Error("No token provided");

                const secret = process.env["JWT_SECRET"];
                if (secret == null) throw new Error("Secret is missing");

                const data = Auth.verifyToken(token);
                response.locals["userId"] = data.id;
                next();
            } else {
                next();
            }
        } catch (error) {
            Logger.error(error, { request, response });
            response.json(createErrorResponse(error, { request, response }));
        }
    }
}
