import { Types } from "mongoose";

export type Model<Data> = Data & { _id: Types.ObjectId; createdAt: Date; updatedAt: Date };
