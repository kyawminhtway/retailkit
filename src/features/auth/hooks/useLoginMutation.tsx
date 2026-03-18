import { loginFn } from "#/server/auth/auth.functions";
import type { ServerError } from "#/types/general";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

type LoginMutationFnParams = {
    username: string,
    password: string,
};

export function useLoginMutation(){
    const navigate = useNavigate();
    const mutationFn = async ({ username, password }: LoginMutationFnParams) => {
        const res = await loginFn({ data: { username, password } });
        return res;
    };
    return useMutation<{ success: boolean }, ServerError, LoginMutationFnParams>({
        mutationFn: mutationFn,
        onSuccess: () => navigate({ to: '/app' }),
    });
}
