import { Database } from "../services/database/database";

export enum UserType {
    basic = "basic",
    admin = "admin",
}

export interface User {
    id: string;
    type: UserType;
    email: string;
}

export const userCollection = Database.instance.collection<User>("user");
