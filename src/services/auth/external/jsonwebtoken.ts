import { sign, verify } from "jsonwebtoken";

export class jsonwebtoken {
    static sign(data: object, secret: string, options?: { expiresIn?: number }) {
        const token = sign(data, secret, options);
        return token;
    }

    static verify(token: string, secret: string) {
        const data = verify(token, secret);
        return data;
    }
}
