import { connect, Mongoose as Database, Types } from "mongoose";

export class Mongoose {
    static database: Database;

    static async connect() {
        const databaseURL = process.env["ATLAS_URI"];
        if (databaseURL == null) throw new Error("DB URI is null");

        Mongoose.database = await connect(databaseURL);
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
