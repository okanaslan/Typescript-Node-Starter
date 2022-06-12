import { captureException, init, Integrations, Handlers } from "@sentry/node";
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import { ScopeContext, SeverityLevel } from "@sentry/types";
import { Express } from "express";
import { LogContext } from "../types/LogContext";
import { LogLevel } from "../types/Severity";

export class Sentry {
    static initialize(expressServer: Express) {
        const sentryDNS = process.env["SENTRY_DSN"];
        if (sentryDNS == null) throw new Error("Sentry config is null");

        init({
            dsn: sentryDNS,
            integrations: [
                new Integrations.Http({ tracing: true }),
                new TracingIntegrations.Express({ app: expressServer, router: expressServer.routes, methods: ["get", "post", "delete"] }),
            ],
            tracesSampleRate: 1.0,
            environment: process.env["NODE_ENV"],
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
        const levelMapping: { [key: string]: SeverityLevel } = {};
        levelMapping[LogLevel.debug] = "debug";
        levelMapping[LogLevel.log] = "log";
        levelMapping[LogLevel.info] = "info";
        levelMapping[LogLevel.warn] = "warning";
        levelMapping[LogLevel.error] = "error";
        levelMapping[LogLevel.fatal] = "fatal";
        levelMapping[LogLevel.critical] = "fatal";

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
