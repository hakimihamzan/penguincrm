import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import Layout from '@/layouts/app/app-layout';
import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Shield, UserIcon } from 'lucide-react';

type UserProps = {
    users: User[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

function Index({ users, pagination }: UserProps) {
    const getInitials = useInitials();

    return (
        <>
            <Head title="User" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div className="mb-12">
                    <h1 className="text-lg font-bold">User</h1>
                    <p>You can see all your users here.</p>
                </div>
                {users.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {users.map((user) => (
                                <Card key={user.id} className="overflow-hidden rounded-md">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <Avatar className="h-10 w-10" aria-label={`Profile photo of ${user.name}`}>
                                                <AvatarImage
                                                    src={user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `/${user.avatar}`) : undefined}
                                                />
                                                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <CardTitle className="mt-2 text-lg">{user.name}</CardTitle>
                                        <CardDescription className="text-muted-foreground text-sm break-all">{user.email}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-2">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Shield className="text-muted-foreground h-4 w-4" />
                                                <span className="text-muted-foreground">Role:</span>
                                                <span className="font-medium">{user.id % 5 === 0 ? 'Administrator' : 'User'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="text-muted-foreground h-4 w-4" />
                                                <span className="text-muted-foreground">Joined:</span>
                                                <span>{getRandomJoinDate()}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {pagination.last_page > 1 && (
                            <div className="mt-6 flex items-center justify-between border-t pt-4">
                                <div className="text-muted-foreground text-sm">
                                    Showing <span className="font-medium">{(pagination.current_page - 1) * pagination.per_page + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span>{' '}
                                    of <span className="font-medium">{pagination.total}</span> users
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" disabled={pagination.current_page <= 1} asChild={pagination.current_page > 1}>
                                        {pagination.current_page > 1 ? (
                                            <Link href={route('users.index', { page: pagination.current_page - 1 })}>Previous</Link>
                                        ) : (
                                            <span>Previous</span>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={pagination.current_page >= pagination.last_page}
                                        asChild={pagination.current_page < pagination.last_page}
                                    >
                                        {pagination.current_page < pagination.last_page ? (
                                            <Link href={route('users.index', { page: pagination.current_page + 1 })}>Next</Link>
                                        ) : (
                                            <span>Next</span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                            <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium">No users found</h3>
                    </div>
                )}
            </div>
        </>
    );
}

const getRandomJoinDate = (): string => {
    const startDate = new Date('2012-01-01').getTime();
    const endDate = new Date('2024-12-31').getTime();

    // Generate a true random value
    const randomValue = Math.random();

    // Calculate timestamp within our range
    const timestamp = startDate + Math.floor(randomValue * (endDate - startDate));

    // Create and format the date
    const date = new Date(timestamp);

    // Format date as "Jan 15, 2018"
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;
