import { Sentry } from "./external/sentry";
import { LoggerOptions } from "./types/LoggerOptions";
import { LogLevel } from "./types/Severity";

export class Logger {
    static silent?: boolean = false;

    static log(message: unknown, options?: LoggerOptions) {
        if (options?.silent == true || Logger.silent) {
            return;
        } else {
            console.log(message);
        }
    }

    static debug(message: unknown, options?: LoggerOptions) {
        if (options?.silent == true || Logger.silent) {
            return;
        } else {
            console.debug(message);
        }
    }

    static info(message: unknown, options?: LoggerOptions) {
        if (options?.silent == true || Logger.silent) {
            return;
        } else {
            console.info(message);
        }
    }

    static warn(message: unknown, options?: LoggerOptions) {
        if (options?.silent == true || Logger.silent) {
            return;
        } else {
            this.sendSentry(message, LogLevel.warn, options);
            console.warn(message);
        }
    }

    static error(message: unknown, options?: LoggerOptions) {
        if (options?.silent == true || Logger.silent) {
            return;
        } else {
            this.sendSentry(message, LogLevel.error, options);
            console.error(message);
        }
    }

    static fatal(message: unknown, options?: LoggerOptions) {
        this.sendSentry(message, LogLevel.fatal, options);
        console.error(message);
    }

    static sendSentry(message: unknown, level: LogLevel, options?: LoggerOptions) {
        const optionsString = JSON.stringify({
            args: options?.args,
            request:
                options?.request != null
                    ? {
                          headers: options?.request?.headers,
                          body: options?.request?.body,
                          query: options?.request?.query,
                          params: options?.request?.params,
                      }
                    : undefined,
            response: options?.response != null ? { locals: options?.response?.locals } : undefined,
        });
        const ipAddress = options?.request?.headers["x-real-ip"] as string | undefined;
        Sentry.sendError(message, {
            level,
            user: { id: options?.userId, ip_address: ipAddress },
            tags: { endpoint: options?.request?.path, method: options?.request?.method },
            extra: { extra: optionsString },
        });
    }
}
