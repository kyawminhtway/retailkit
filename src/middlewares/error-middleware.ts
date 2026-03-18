import { AuthError } from "#/utils/exceptions";
import { createMiddleware } from "@tanstack/react-start";

export const ErrorMiddleware = createMiddleware()
.server(async ({ next }) => {
    try{
        return await next();
    }catch(err){
        let res: { code: string, message: string };
        if(err instanceof AuthError){
            res = { code: 'AUTH_ERROR', message: err.message };
        }else{
            throw err;
        }
        throw res;
    }
});