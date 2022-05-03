import { captureException, init, Integrations, Handlers, Severity } from "@sentry/node";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import { ScopeContext } from "@sentry/types";
import { Express } from "express";
import { LogContext } from "../types/LogContext";
import { LogLevel } from "../types/Severity";

export class Sentry {
    static initialize(expressServer: Express) {
        const sentryDNS = process.env["SENTRY_DSN"];
        if (sentryDNS == null) throw new Error("Sentry config is null");

        init({
            dsn: sentryDNS,
            integrations: [new Integrations.Http({ tracing: true }), new TracingIntegrations.Express({ app: expressServer })],
            tracesSampleRate: 1.0,
            environment: "Development",
        });
        expressServer.use(Handlers.requestHandler());
        expressServer.use(Handlers.tracingHandler());
        expressServer.use(Handlers.errorHandler());
    }

    static sendError(message: unknown, context: Partial<LogContext>) {
        const sentryContext = Sentry.convertLogContext(context);
        captureException(message, sentryContext);
    }

    private static convertLogContext(context: Partial<LogContext>): Partial<ScopeContext> {
        const levelMapping: { [key: string]: Severity } = {};
        levelMapping[LogLevel.debug] = Severity.Debug;
        levelMapping[LogLevel.log] = Severity.Log;
        levelMapping[LogLevel.info] = Severity.Info;
        levelMapping[LogLevel.warn] = Severity.Warning;
        levelMapping[LogLevel.error] = Severity.Error;
        levelMapping[LogLevel.fatal] = Severity.Fatal;
        levelMapping[LogLevel.critical] = Severity.Critical;

        const sentryLog = {
            level: context.level != null ? levelMapping[context.level] : undefined,
            user: context.user,
            extra: context.extra,
            contexts: context.contexts,
            tags: context.tags,
            fingerprint: context.fingerprint,
        };
        return sentryLog;
    }
}