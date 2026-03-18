import { AppSideBar } from '#/components/common/AppSidebar';
import { SidebarProvider } from '#/components/ui/sidebar';
import { getMenuitemsFn } from '#/server/base/base.functions';
import { createFileRoute, Outlet, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const menuitems = await context.queryClient.fetchQuery({
            queryKey: ['menu-items'],
            queryFn: getMenuitemsFn,
        });
        return menuitems;
    },
})

function RouteComponent() {
    const menuitems = useLoaderData({ from: Route.id });
    return (
        <SidebarProvider>
            <AppSideBar menuitems={menuitems}/>
            <Outlet />
        </SidebarProvider>
    );
}
