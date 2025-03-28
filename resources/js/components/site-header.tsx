import { usePage } from '@inertiajs/react';
import { SidebarIcon } from 'lucide-react';

import { SearchForm } from '@/components/search-form';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import React from 'react';

export function SiteHeader() {
    const { toggleSidebar } = useSidebar();
    const { url: pathname } = usePage();

    const generateBreadcrumbs = () => {
        // Remove query parameters and hash fragments from the pathname
        const cleanPathname = pathname.split(/[?#]/)[0];

        // Split the clean pathname into segments
        const pathSegments = cleanPathname.split('/').filter(Boolean);

        return pathSegments.map((segment, index) => {
            // Create a URL up to this segment
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;

            // Format the segment for display (capitalize first letter)
            const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

            // If this is the last segment, it's the current page
            const isLastSegment = index === pathSegments.length - 1;

            return (
                <React.Fragment key={url}>
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                        {isLastSegment ? (
                            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                        ) : (
                            <BreadcrumbLink href={url}>{formattedSegment}</BreadcrumbLink>
                        )}
                    </BreadcrumbItem>
                </React.Fragment>
            );
        });
    };

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
                <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
                    <SidebarIcon />
                </Button>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
                </Breadcrumb>
                <SearchForm className="w-full sm:ml-auto sm:w-auto" />
            </div>
        </header>
    );
}
