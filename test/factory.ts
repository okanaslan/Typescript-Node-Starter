import { User, userModel } from "../src/entities/user";

export class Factory {
    static user: Partial<User> = {
        email: "user@mail.com",
    };

    private static updateFields<DataType>(data: DataType, partial?: Partial<DataType>) {
        if (partial != null) {
            for (const key of Object.keys(partial)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                data[key as keyof DataType] = partial[key as keyof DataType];
            }
        }
        return data;
    }

    static async generateUser(partial?: Partial<User>): Promise<User> {
        const data = Factory.updateFields(Factory.user, partial);
        const user = await userModel.create({ ...data });
        return user;
    }
}
