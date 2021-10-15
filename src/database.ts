import { config } from "dotenv";
import { connect, Connection } from "mongoose";

export class Database {
    static async connect(connectionURI: string): Promise<Connection> {
        const mongo = await connect(connectionURI);
        return mongo.connection;
    }

    static async connectDefault(): Promise<Connection> {
        config();
        if (process.env.MongoURI != null) {
            return Database.connect(process.env.MongoURI!);
        } else {
            throw new Error("Environment Error");
        }
    }
}
