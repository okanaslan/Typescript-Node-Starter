import { config } from "dotenv";
import { Mongoose } from "./external/mongoose";

export class Database {
    static async connect() {
        config();
        await Mongoose.connect();
    }

    static async get() {
        return Mongoose.database;
    }

    static async close() {
        await Mongoose.get();
    }
}
