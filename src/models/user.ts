import { Document, model, Model, Schema } from "mongoose";

export interface User {
    username: string;
}

export interface UserDocument extends User, Document {
    // declare any instance methods here
}

interface UserModel extends Model<UserDocument> {
    // declare any static methods here
}

const userSchema = new Schema<UserDocument, UserModel>(
    {
        username: String,
    },
    { timestamps: true }
);

export const User = model<UserDocument, UserModel>("User", userSchema);
