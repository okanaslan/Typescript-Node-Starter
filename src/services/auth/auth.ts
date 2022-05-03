import { User } from "../../entities/user";
import { jsonwebtoken } from "./external/jsonwebtoken";
import { TokenPayload } from "./types/TokenPayload";

export class Auth {
    static generateToken(user: User): string {
        const secret = process.env["JWT_SECRET"];
        if (secret == null) throw new Error("Secret is missing");

        const token = jsonwebtoken.sign({ id: user.id }, secret, {
            expiresIn: 86400,
        });
        return token;
    }

    static verifyToken(token: string): TokenPayload {
        const secret = process.env["JWT_SECRET"];
        if (secret == null) throw new Error("Secret is missing");

        const data = jsonwebtoken.verify(token, secret) as TokenPayload;
        return data;
    }
}
