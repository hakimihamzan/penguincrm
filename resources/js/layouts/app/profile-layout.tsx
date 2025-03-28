import { useSidebar } from '@/components/ui/sidebar';
import Layout from '@/layouts/app/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

function ProfileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const { url } = usePage();
    const isActive = (path: string) => url === path || url.startsWith(`${path}/`);

    return (
        <Link
            className={`mr-1 mb-2 block rounded border px-4 py-2 transition-colors ${
                isActive(href)
                    ? 'bg-gray-100 font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50'
            }`}
            href={href}
            preserveState
        >
            {children}
        </Link>
    );
}

function ProfileNavigation() {
    const { toggleSidebar, state } = useSidebar();

    /**
     * @ kimi_rant
     *
     * This is a workaround to sync the sidebar state with localStorage. This is necessary
     * because the sidebar state is not persisted between page loads.
     *
     * Consider using Inertia.js persistent layouts to avoid this.
     */
    useEffect(() => {
        // Check localStorage and sync sidebar state on component mount
        const storedState = localStorage.getItem('sidebar') ?? 'expanded';

        // Only toggle if current state differs from stored state
        if (storedState !== state) {
            toggleSidebar();
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="mb-6 border-gray-200 sm:flex dark:border-gray-700">
            <ProfileNavLink href="/profile/me">My Profile</ProfileNavLink>
            <ProfileNavLink href="/profile/password">My Password</ProfileNavLink>
            <ProfileNavLink href="/profile/appearance">My Appearance</ProfileNavLink>
        </div>
    );
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout>
            <Head title="Profile" />
            <div className="px-16 py-10">
                <div className="mb-10">
                    <h1 className="text-lg font-bold">Profile</h1>
                    <p>Manage your profile.</p>
                </div>
                <div>
                    <ProfileNavigation />
                    <div className="mt-10 sm:mt-0">{children}</div>
                </div>
            </div>
        </Layout>
    );
}

/**
 * @ kimi_rant
 *
 * This is not the correct way to do peristent layout in Inertia.js.
 * By doing normal React way of layout, when navigating to other page,
 * the layout will be destroyed and re-rendered.
 *
 * To test this out, play the podcast when you are currently in the profile page then
 * navigate to other page. You will see the podcast stopped and re-rendered again. But if you
 * go to other pages that uses persistent layout, the podcast will not be stopped.
 *
 * Check out other pages for persistent layout.
 *
 * Quick Example :

    Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />;

*
 * For more info: https://inertiajs.com/pages#persistent-layouts
 *
 */
