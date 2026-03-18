import { GlobalAlert } from '#/components/common/GlobalAlert';
import { useLoginMutation } from '#/features/auth/hooks/useLoginMutation';
import { refreshTokenFn } from '#/server/auth/auth.functions';
import { showWarning } from '#/utils/dialogs';
import { createFileRoute, redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/')({
    component: App,
    beforeLoad: async ({ context }) => {
        if(!context.store?.state?.accessToken)
            throw redirect({ to: '/login' });
    },
    loader: async ({ context }) => {
        const { accessToken } = await context?.queryClient.fetchQuery({ 
            queryKey: ['refresh-token'], 
            queryFn: refreshTokenFn,
        });
        return accessToken;
    },
})

function App() {
    const mutation = useLoginMutation();
    return (
        <div>
            <GlobalAlert />
            <button onClick={() => { mutation.mutateAsync({ username: 'admin', password: 'admin' }) }}>
                Login
            </button>
            <button onClick={() => { 
                showWarning('An error occurred!!!');
             }}>
                Show Alert
            </button>
    </div>
  )
}
