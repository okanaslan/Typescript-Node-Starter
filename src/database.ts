import { connect } from "mongoose";

export class Database {
    static async connect(connectionURI: string) {
        const mongo = await connect(connectionURI, { useNewUrlParser: true, useUnifiedTopology: true });
        return mongo.connection;
    }
}
