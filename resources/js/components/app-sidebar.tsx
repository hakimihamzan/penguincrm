import { Building2, Command, Contact, Loader2, User } from 'lucide-react';
import * as React from 'react';

import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';

const data = {
    projects: [
        {
            name: 'Contacts',
            url: '/contacts',
            icon: Contact,
        },
        {
            name: 'Organizations',
            url: '/organizations',
            icon: Building2,
        },
        {
            name: 'Users',
            url: '/users',
            icon: User,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAudioLoading, setIsAudioLoading] = React.useState(false);

    return (
        <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Penguin CRM</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <div className="relative my-2 overflow-hidden rounded-sm shadow-sm">
                    {isAudioLoading && (
                        <div className="bg-muted absolute inset-0 flex items-center justify-center">
                            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                        </div>
                    )}
                    {/* <iframe
                        width="100%"
                        height={125}
                        seamless
                        src="https://player.simplecast.com/fd0bd2ba-c553-466c-a060-b144797ce369?dark=false"
                        onLoad={() => setIsAudioLoading(false)}
                        style={{ opacity: isAudioLoading ? 0 : 1, transition: 'opacity 0.3s' }}
                    /> */}
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
