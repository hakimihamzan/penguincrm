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
