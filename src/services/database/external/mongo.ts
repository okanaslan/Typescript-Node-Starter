import { Db, MongoClient, ObjectId } from "mongodb";

export class Mongo {
    client: MongoClient;

    constructor() {
        const databaseURI = process.env["MONGO_URI"];
        if (databaseURI == null) throw new Error("Database URI is null");

        this.client = new MongoClient(databaseURI);
    }

    async connect(): Promise<Db> {
        await this.client.connect();
        const database = this.client.db();
        return database;
    }

    async close() {
        await this.client?.close();
    }

    static toOBjectId(id: string): ObjectId {
        return new ObjectId(id);
    }

    static generateId(): ObjectId {
        return new ObjectId();
    }
}
