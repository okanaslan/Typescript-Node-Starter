import { config } from "dotenv";
import { Db } from "mongodb";
import { Mongo } from "./external/mongo";

export class Database {
    static connection: Mongo;
    static instance: Db;

    static async initialize() {
        config();
        const mongo = new Mongo();
        Database.connection = mongo;
        Database.instance = await mongo.connect();
    }

    static async close() {
        await Database.connection?.close();
    }
}
