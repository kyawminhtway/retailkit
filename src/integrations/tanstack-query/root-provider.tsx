import type { ReactNode } from 'react'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { RootRouterContext } from '#/routes/__root'
import { clientStore } from '#/lib/store';
import { redirect } from '@tanstack/react-router';
import { showError } from '#/utils/dialogs';


let context:
  | RootRouterContext
  | undefined

export function getContext() {
    if (context) {
        return context
    }

    const queryClient = new QueryClient({
        queryCache: new QueryCache({
            onError: (error, query) => {
                if(query.queryKey.includes('refresh-token')){
                    throw redirect({ to: '/login' });
                }
                showError(error.message);
            },
        }),
    });
    const store = clientStore;

    context = { queryClient, store }

    return context
}

export default function TanStackQueryProvider({
    children,
}: {
    children: ReactNode
}) {
    const { queryClient } = getContext();

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
