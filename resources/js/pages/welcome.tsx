import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to PenguinCRM">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
                {/* Navigation */}
                <header className="border-b border-gray-100 dark:border-gray-800">
                    <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
                        <div className="flex items-center">
                            <span className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">PenguinCRM</span>
                        </div>
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex flex-1 flex-col items-center justify-center px-6">
                    <div className="flex max-w-3xl flex-col items-center text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                            Customer management,
                            <span className="block text-primary dark:text-blue-400">simplified.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                            PenguinCRM helps you manage your customer relationships efficiently. Track contacts,
                            organizations, and deals in one place with our intuitive dashboard.
                        </p>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                                >
                                    View Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="bg-gray-50 py-16 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Contact Management</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Organize and track all your contacts in one central location.
                                    Add notes, set follow-ups, and never miss an opportunity.
                                </p>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Get a comprehensive overview of your business with real-time
                                    analytics. Monitor performance metrics in one place.
                                </p>
                            </div>

                            <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">Payment Tracking</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Keep track of invoices and payments. Monitor status
                                    and get insights into your revenue stream.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-6 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                © {new Date().getFullYear()} PenguinCRM. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                    <span className="sr-only">Terms</span>
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                    <span className="sr-only">Privacy</span>
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
