import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from 'react';

type MenuItemProps = {
    label: string,
    icon?: IconName,
    to: string,
    childMenus?: MenuItemProps[],
    isRoot?: boolean,
    children?: ReactNode,
};

export function MenuItem({ label, icon, to, childMenus }: MenuItemProps){
    if(childMenus){
        return (
            <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                            <Link to={to} className='font-semibold'>
                                {icon ? <DynamicIcon name={icon} /> : null}
                                <span>{label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {childMenus.map((menu) => <InternalNode  {...menu} key={menu.label}/>)}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    }else{
        return (
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link to={to} className='font-semibold'>
                        {icon ? <DynamicIcon name={icon} /> : null}
                        <span>{label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }
};

function InternalNode({ label, icon, to, childMenus }: MenuItemProps){
    if(childMenus){
        return (
            <Collapsible className="group/collapsible">
                <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton asChild>
                            <Link to={to}>
                                {icon ? <DynamicIcon name={icon} /> : null}
                                <span>{label}</span>
                            </Link>
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            { childMenus.map(menu => 
                                menu.childMenus ? 
                                    <InternalNode key={menu.label} {...menu}/> 
                                    : 
                                    <LeafNode key={menu.label} {...menu} />
                            )}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuSubItem>
            </Collapsible>
        );
    }else{
        return <LeafNode label={label} to={to} />;   
    }
};

function LeafNode({ label, to }: MenuItemProps){
    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
                <Link to={to}>
                    <span>{label}</span>
                </Link>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    );
};