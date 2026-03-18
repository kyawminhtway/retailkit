import type { MenuItems } from "#/types/general";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "../ui/sidebar";
import { MenuItem } from "./MenuItem";

type AppSideBarProps = {
    menuitems: MenuItems[]
};

export function AppSideBar({ menuitems }: AppSideBarProps){
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-medium text-xl">
                        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
                        retailKIT
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-3">
                        <SidebarMenu>
                            {menuitems.map(menu => <MenuItem {...menu} key={menu.label} />)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}