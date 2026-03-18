import { prisma } from "#/db";
import { createMiddleware } from "@tanstack/react-start";
import { ErrorMiddleware } from "./error-middleware";


export const TransactionMiddleware = createMiddleware()
.middleware([ErrorMiddleware])
.server(async ({ next }) => {
    return await prisma.$transaction(async (tx) => {
        return await next({ context: { tx } });
    }, {
        timeout: 30 * 1000,
        maxWait: 30 * 1000,
    });
});