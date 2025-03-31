import { Link, usePage } from '@inertiajs/react';

export function ProfileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
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

export function ProfileNavigation() {
    return (
        <div className="mb-6 border-gray-200 sm:flex dark:border-gray-700">
            <ProfileNavLink href="/profile/me">My Profile</ProfileNavLink>
            <ProfileNavLink href="/profile/password">My Password</ProfileNavLink>
            <ProfileNavLink href="/profile/appearance">My Appearance</ProfileNavLink>
        </div>
    );
}

/**
 * @ kimi_rant
 *
 * This is the correct way to do peristent layout in Inertia.js.
 * If you are using doing normal React way of layout, when navigating to other page,
 * the layout will be destroyed and re-rendered.
 *
 * REACT STYLE LAYOUT
 * <Layout>{page}</Layout>
 *
 * instead of
 *
 * INERTIA PERSISTENT LAYOUT
 * Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />;
 *
 *
 * To test this out, convert the layout to be react style layout, enter something into the right top
 * searchbar, then navigate to other page. You will see the input is reset and re-rendered again.
 * But if you go to other pages that uses persistent layout, the input will stay the same.
 *
 * For more info: https://inertiajs.com/pages#persistent-layouts
 *
 */
