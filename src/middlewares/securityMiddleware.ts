import { NextFunction, Request, Response } from "express";
import { Logger } from "../services/logger/logger";

import { createErrorResponse } from "../utils/responseUtils";

export class SecurityMiddleware {
    static attackEndpoints = [
        "/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.phpƒ",
        "/.env",
        "/.git/config",
        "/manager/html",
        "/core/.env",
        "/script",
        "/ecp/Current/exporttool/microsoft.exchange.ediscovery.exporttool.application",
        "/actuator/health",
        "/phpmyadmin2013/index.php",
        "/1phpmyadmin/index.php",
        "/administrator/web/index.php",
        "/db/phpMyAdmin/index.php",
        "/sql/phpmyadmin4/index.php",
        "/login",
        "/ReportServer",
        "/index.php",
        "/shell",
        "/GponForm/diag_Form",
        "///remote/fgt_lang",
        "*",
        "/sitemap.xml",
        "/robots.txt",
        "/Nmap/folder/check1651048135",
        "/nmaplowercheck1651048135",
    ];

    static secureEndpoints = ["user", "api-docs"];

    static async check(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const isSecurityIssue = SecurityMiddleware.attackEndpoints.includes(request.path);
            const isSecurePath = request.path == "/" || SecurityMiddleware.secureEndpoints.includes(request.path.split("/")[1] ?? "");

            if (isSecurityIssue) {
                Logger.critical("Security issue!", { request, response });
                response.json(createErrorResponse("Security issue!", { request, response }));
                return;
            }
            if (!isSecurePath) {
                Logger.critical("Not a valid endpoint", { request, response });
                response.json(createErrorResponse("Not a valid endpoint", { request, response }));
                return;
            } else {
                next();
            }
        } catch (error) {
            Logger.error(error, { request, response });
            response.json(createErrorResponse(error, { request, response }));
        }
    }
}
