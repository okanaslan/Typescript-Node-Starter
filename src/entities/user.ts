import { Schema, model } from "mongoose";

export enum UserType {
    basic = "basic",
    admin = "admin",
}

export interface User {
    id: string;
    type: UserType;
    email: string;
}

const userSchema = new Schema<User>(
    {
        type: { type: String, enum: UserType, default: UserType.basic },
        email: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

export const userModel = model("User", userSchema);
