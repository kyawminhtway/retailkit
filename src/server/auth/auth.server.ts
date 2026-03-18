import { ACCESS_TOKEN_LIFETIME, HASH_PASSWORD_MEMORY_COST, HASH_PASSWORD_PARALLELISM, HASH_PASSWORD_TIME_COST, REFRESH_TOKEN_BYTE_SIZE } from "#/constants/general";
import type { User } from "#/generated/prisma/client";
import type { Transaction } from "#/types/general";
import { AuthError } from "#/utils/exceptions";
import * as jose from "jose";
import crypto from "crypto";
import argon2 from 'argon2'
import { getCookie } from "@tanstack/react-start/server";
import type { JWTPayload } from "#/types/auth";


export const createTokens = async (tx: Transaction, user: User) => {
    const jwt = await signJWT(user);
    const hashedJWT = crypto.createHash('sha256').update(jwt).digest('hex');
    await tx.accessToken.create({
        data: {
            value: hashedJWT,
            userID: user.id,
        }
    });
    const refresTokenString = crypto.randomBytes(REFRESH_TOKEN_BYTE_SIZE).toString("base64url");
    const refreshTokenHash = crypto.createHash('sha256').update(refresTokenString).digest('hex');
    const refreshToken = await tx.refreshToken.create({
        data: {
            dateOfExpiration: new Date(),
            value: refreshTokenHash,
            userID: user.id,
        }
    });
    return { jwt, refreshToken };
};

export const signJWT = async (user: User) => {
    const secretKey = jose.base64url.decode(process.env.JWT_SECRET!);
    const jwt = await new jose.SignJWT({
        userID: user.id,
        profileName: user.name,
        username: user.username,
    }).setIssuedAt()
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ACCESS_TOKEN_LIFETIME}h`)
    .sign(secretKey);
    return jwt;
};

export const authenticateUser = async (tx: Transaction, username: string, password: string) => {
    const user = await tx.user.findFirst({ where: { username } });
    if(!user) 
        throw new AuthError('Invalid username or password!');
    const isValid = await argon2.verify(user.password, password);
    if(!isValid) 
        throw new AuthError('Invalid username or password!');
    const { jwt, refreshToken } = await createTokens(tx, user);
    return {
        user,
        jwt,
        refreshToken
    };
};

export const refreshToken = async (tx: Transaction) => {
    const refreshToken = getCookie("refreshToken");
    if(!refreshToken)
        throw new AuthError('Refresh token is missing');
    const hash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const token = await tx.refreshToken.findFirst({ 
        where: { 
            value: hash, 
            active: true, 
            user: { active: true } 
        }, 
        include: { user: true },
    });
    if(!token)
        throw new AuthError('Invalid refresh token!');
    const { jwt, refreshToken: newRefreshToken } = await createTokens(tx, token.user);
    return {
        user: token.user,
        jwt,
        refreshToken: newRefreshToken
    }; 
};

export const hashPassword = async (password: string) => {
    const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: HASH_PASSWORD_MEMORY_COST,
        timeCost: HASH_PASSWORD_TIME_COST,
        parallelism: HASH_PASSWORD_PARALLELISM,
    });
    return hashedPassword;
};

export const createUser = async (tx: Transaction, data: User) => {
    data.password = await hashPassword(data.password);
    const user = await tx.user.create({ data });
    return user;
};