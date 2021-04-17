import { User, UserDocument } from "../src/models/user";

type Model = UserDocument;

export class Factory {
    static generate<T extends Model, K extends keyof Model>(object: T, args?: { field: K; value: T[K] }[]): Model {
        let temp: Model;
        if (object instanceof User) {
            temp = this.generateUser();
        } else {
            temp = object;
        }

        if (args) {
            for (const arg of args) {
                temp[arg.field] = arg.value;
            }
        }
        return temp;
    }

    static generateMany<T extends Model, K extends keyof Model>(object: T, args: { field: K; value: T[K] }[], size: number): Model[] {
        const array = [];
        for (let i = 0; i < size; i++) {
            array.push(Factory.generate(object, args));
        }
        return array;
    }

    private static generateUser(): UserDocument {
        const user = new User();
        user.username = "user";
        return user;
    }
}
