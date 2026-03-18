import crypto from "crypto";
import { createMiddleware } from "@tanstack/react-start";
import { TransactionMiddleware } from "./transaction-middleware";
import { AuthError } from "#/utils/exceptions";
import { jwtVerify } from "jose";
import * as jose from "jose";
import type { JWTPayload } from "#/types/auth";
import { useAppSession } from "#/utils/session";
import { refreshToken } from "#/server/auth/auth.server";
import type { Transaction } from "#/types/general";


const getJWTPayload = async (jwt: string) => {
    try{
        const secretKey = jose.base64url.decode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify<JWTPayload>(jwt, secretKey);
        return payload;
    }catch(err){
        if(err instanceof jose.errors.JWTExpired) {
            return;
        }else{
            throw err;
        }
    }
};

const refreshTokenHelper = async (tx: Transaction) => {
    const { user, jwt, refreshToken: newRefreshToken } = await refreshToken(tx);
    const session = await useAppSession();
    await session.update({
        userID: user.id,
        refreshToken: newRefreshToken.value,
        accessToken: jwt,
    });
    return jwt;
};

export const AuthMiddleware = createMiddleware()
.middleware([TransactionMiddleware])
.server(async ({ next, request, context }) => {
    let accessToken; let refreshed = false;
    const tx = context.tx;
    accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
    if(!accessToken)
        throw new AuthError('Access token is missing in the headers!');
    const hashedJWT = crypto.createHash('sha256').update(accessToken).digest('hex');
    const count = await tx.accessToken.count({ where: { value: hashedJWT, active: true } });
    if(count !== 1){
        accessToken = await refreshTokenHelper(tx);
        refreshed = true;
    }
    const payload = await getJWTPayload(accessToken);
    if(!payload){
        accessToken = await refreshTokenHelper(tx);
        refreshed = true;
    }
    return await next({ context: { accessToken: refreshed ? accessToken : null } });
});