import { createServerFn } from "@tanstack/react-start";
import { LoginSchema } from "./schemas";
import { TransactionMiddleware } from "#/middlewares/transaction-middleware";
import { authenticateUser, refreshToken as refreshTokenService } from "./auth.server";
import { useAppSession } from "#/utils/session";


export const loginFn = createServerFn({ method: 'POST' })
    .middleware([TransactionMiddleware])
    .inputValidator(LoginSchema)
    .handler(async ({ data, context }): Promise<{ success: boolean }> => {
        const tx = context.tx;
        const { user, jwt, refreshToken } = await authenticateUser(tx, data.username, data.password);
        const session = await useAppSession();
        await session.update({
            userID: user.id,
            refreshToken: refreshToken.value,
            accessToken: jwt,
        });
        return {success: true}
    }
);

export const refreshTokenFn = createServerFn({ method: 'GET' })
    .middleware([TransactionMiddleware])
    .handler(async ({ context }): Promise<{ accessToken: string }> => {
        const tx = context.tx;
        const { user, jwt, refreshToken } = await refreshTokenService(tx);
        const session = await useAppSession();
        await session.update({
            userID: user.id,
            refreshToken: refreshToken.value,
            accessToken: jwt,
        });
        return { accessToken: jwt }
    }
);