import type { PrismaClient } from "#/generated/prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/client";
import type { IconName } from "lucide-react/dynamic";

export type Transaction = Omit<PrismaClient<never, undefined, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;

export type ErrorType = 'AuthError' | 'ValidationError';
export type ServerError = {
    type: ErrorType,
    message: string,
    stack: string,
};

export type Response<T> = {
    result?: T,
    accessToken?: string,
}

export type MenuItems = {
    label: string,
    icon?: IconName,
    to: string,
    childMenus?: MenuItems[],
    isRoot?: boolean,
};