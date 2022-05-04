import { Google } from "./external/google";
import { Sentry } from "./external/sentry";
import { LoggerOptions } from "./types/LoggerOptions";
import { LogLevel } from "./types/Severity";

export class Logger {
    static silent?: boolean = false;

    static isSilent(options?: LoggerOptions) {
        return options?.silent == true || Logger.silent;
    }

    static log(message: string, options?: LoggerOptions) {
        if (Logger.isSilent(options)) {
            return;
        } else {
            console.log(message);
        }
    }

    static debug(message: string, options?: LoggerOptions) {
        if (Logger.isSilent(options)) {
            return;
        } else {
            console.debug(message);
        }
    }

    static info(message: string, options?: LoggerOptions) {
        if (Logger.isSilent(options)) {
            return;
        } else {
            Google.info(message, options?.request);
        }
    }

    static warn(message: string, options?: LoggerOptions) {
        if (Logger.isSilent(options)) {
            return;
        } else {
            this.sendToErrorLogger(message, LogLevel.warn, options);
            console.warn(message);
        }
    }

    static error(message: string, options?: LoggerOptions) {
        if (Logger.isSilent(options)) {
            return;
        } else {
            this.sendToErrorLogger(message, LogLevel.error, options);
            console.error(message);
        }
    }

    static fatal(message: string, options?: LoggerOptions) {
        this.sendToErrorLogger(message, LogLevel.fatal, options);
        console.error(message);
    }

    static critical(message: string, options?: LoggerOptions) {
        this.sendToErrorLogger(message, LogLevel.critical, options);
        console.error(message);
    }

    static sendToErrorLogger(message: string, level: LogLevel, options?: LoggerOptions) {
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
