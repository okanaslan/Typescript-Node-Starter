import { connect, Mongoose as Database, Types } from "mongoose";

export class Mongoose {
    static database: Database;

    static async connect() {
        const databaseURI = process.env["MONGO_URI"];
        if (databaseURI == null) throw new Error("Database URI is null");

        Mongoose.database = await connect(databaseURI);
    }

    static async get() {
        return Mongoose.database;
    }

    static async close() {
        await this.database?.connection.close();
    }

    static toOBjectId(id: string): Types.ObjectId {
        return new Types.ObjectId(id);
    }

    static generateId(): Types.ObjectId {
        return new Types.ObjectId();
    }
}
