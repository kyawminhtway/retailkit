import { MENU_ITEMS } from "#/constants/general";
import { AuthMiddleware } from "#/middlewares/auth-middleware";
import type { MenuItems } from "#/types/general";
import { createServerFn } from "@tanstack/react-start";


export const getMenuitemsFn = createServerFn({ method: 'GET' })
    .middleware([AuthMiddleware])
    .handler(async (): Promise<MenuItems[]> => {
        return MENU_ITEMS;
    }
);