import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
  } from "@/components/shadcn/sidebar"
import { AppNavMain } from "@/components/app-nav-main"
import { NAV_EXPERIENCES, NAV_JOB_VACANCIES } from "@/types"

export const AppSidebar = ({...props }: React.ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex p-2">
                            <Link href="/dashboard" className="flex w-fit">
                                <Image
                                    src="/fill-rounded-vicky-logo.svg"
                                    alt="Vicky Logo"
                                    width={28}
                                    height={28}
                                    className="self-center"
                                />
                            </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <AppNavMain items={NAV_EXPERIENCES} showGroupLabel={false} />
                <SidebarGroup>
                    <SidebarGroupLabel>Job Vacancies</SidebarGroupLabel>
                <SidebarMenu className="gap-2">
                    {NAV_JOB_VACANCIES.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            {item.items?.length ? (
                                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                    {item.items.map((item) => (
                                    <SidebarMenuSubItem key={item.title}>
                                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                                            <Link href={item.url}>{item.title}</Link>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            ) : null}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
