import { LogLevel } from "./Severity";

interface User extends Record<string, any> {
    id?: string;
    ip_address?: string;
    email?: string;
    username?: string;
}
type Extras = Record<string, unknown>;

type Context = Record<string, unknown>;
type Contexts = Record<string, Context>;

type Primitive = number | string | boolean | bigint | symbol | null | undefined;
type Tags = Record<string, Primitive>;

export type LogContext = {
    user: User;
    level: LogLevel;
    extra: Extras;
    contexts: Contexts;
    tags: Tags;
    fingerprint: string[];
};
