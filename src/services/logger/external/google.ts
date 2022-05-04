import { Request } from "express";
import { Entry, Log, Logging } from "@google-cloud/logging";
import { NodeEnvironment } from "../../../types/NodeEnvironment";
import { Logger } from "../logger";

export class Google {
    static logger: Log;

    static initialize(projectId: string) {
        const privateKey = process.env["GOOGLE_PRIVATE_KEY"];
        const clientEmail = process.env["GOOGLE_CLIENT_EMAIL"];
        const clientId = process.env["GOOGLE_CLIENT_ID"];

        if (privateKey == null) throw new Error("Google private key is null");
        if (clientEmail == null) throw new Error("Google client email is null");
        if (clientId == null) throw new Error("Google client id is null");

        const googleLogs = new Logging({
            projectId,
            credentials: {
                private_key: privateKey.replace(/\\n/gm, "\n"),
                client_email: clientEmail,
                client_id: clientId,
            },
        });
        Google.logger = googleLogs.log(`${projectId}Logs`);
    }

    static async info(data: any, request?: Request<any, any, any>): Promise<void> {
        if (process.env.NODE_ENV == NodeEnvironment[NodeEnvironment.production]) {
            try {
                await Google.logger.info(new Entry({ timestamp: new Date(), httpRequest: request }, data));
            } catch (error) {
                Logger.error(error as string);
            }
        } else {
            console.log(data);
        }
    }
}
