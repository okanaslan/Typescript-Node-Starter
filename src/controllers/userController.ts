import { Request, Response } from "express";

export class UserController {
    static get(request: Request, response: Response): void {
        request.method;
        response.json({
            username: "okanaslan",
        });
    }
}
