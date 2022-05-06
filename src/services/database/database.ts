import { config } from "dotenv";
import { Mongo } from "./external/mongo";

export class Database {
    static async initialize() {
        config();
        await Mongo.connect();
    }

    static async get() {
        return Mongo.database;
    }

    static async close() {
        await Mongo.get();
    }
}
