import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/layouts/app/app-layout';
import { Head, router } from '@inertiajs/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, PencilIcon, PlusIcon, TrashIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Contact = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    city?: string;
    country?: string;
    company?: string;
    job_title?: string;
    notes?: string;
    status: 'active' | 'inactive';
    avatar?: string;
};

type ContactProps = {
    contacts: Contact[];
    filters: {
        name?: string;
        email?: string;
        phone?: string;
        status?: string;
        sort_by?: string;
        sort_order?: string;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

type SortDirection = 'asc' | 'desc';

function Contact({ contacts, pagination, filters }: ContactProps) {
    const [search, setSearch] = useState<string>('');

    const [sortBy, setSortBy] = useState<string>(filters.sort_by || '');
    const [sortOrder, setSortOrder] = useState<SortDirection>((filters.sort_order as SortDirection) || 'asc');

    /**
     *  @ kimi_rant
     *
     * At least 2 ways to handle pagination in Inertia.js, either by using the router.get or <Link> component.
     * The benefit of using the router.get is that to better control the flow of the application or for more complex scenarios,
     * the <Link> component is more suitable for simple navigation between pages, but <Link> can use prefetch which is awesome.
     *
     *
     * @param newPage
     * @returns void
     */
    function handlePageChange(newPage: number) {
        if (newPage < 1 || newPage > pagination.last_page) return;

        router.get(
            route('contacts.index'),
            {
                sort_by: sortBy,
                sort_order: sortOrder,
                page: newPage,
                per_page: pagination.per_page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['contacts', 'pagination'],
            },
        );
    }

    const handleSort = (column: string) => {
        let newOrder: SortDirection = 'asc';

        // If already sorting by this column, toggle direction
        if (sortBy === column) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }

        setSortBy(column);
        setSortOrder(newOrder);

        router.get(
            route('contacts.index'),
            {
                page: pagination.current_page,
                per_page: pagination.per_page,
                sort_by: column,
                sort_order: newOrder,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['contacts', 'pagination'],
            },
        );
    };

    // Helper to render sort indicator
    const renderSortIndicator = (column: string) => {
        if (sortBy !== column) return null;

        return sortOrder === 'asc' ? <ChevronUpIcon className="ml-2 h-4 w-4" /> : <ChevronDownIcon className="ml-2 h-4 w-4" />;
    };

    return (
        <>
            <Head title="Contact" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div className="mb-16">
                    <h1 className="text-lg font-bold">Contact</h1>
                    <p>You can manage all your contacts here.</p>
                </div>

                <div className="mb-6 flex items-center justify-between">
                    <div className="w-[400px]">
                        <Input
                            type="text"
                            placeholder="Search by name, email or phone"
                            value={search}
                            onChange={(e) => {
                                const newSearchValue = e.target.value;
                                setSearch(newSearchValue);

                                // Only trigger search if string is empty or has at least 3 chars
                                if (newSearchValue.length > 2 || newSearchValue.length === 0) {
                                    router.get(
                                        route('contacts.index'),
                                        {
                                            page: 1,
                                            per_page: pagination.per_page,
                                            sort_by: sortBy,
                                            sort_order: sortOrder,
                                            search: newSearchValue,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            only: ['contacts', 'pagination'],
                                        },
                                    );
                                }
                            }}
                        />
                    </div>
                    <div className="">
                        <Button
                            variant="outline"
                            className="size-8 cursor-pointer"
                            size="icon"
                            onClick={() => router.visit(route('contacts.create'))}
                        >
                            <span className="sr-only">Create new contact</span>
                            <PlusIcon />
                        </Button>
                    </div>
                </div>

                {contacts.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('id')}>
                                    <div className="flex items-center">#{renderSortIndicator('id')}</div>
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                                    <div className="flex items-center">
                                        Name
                                        {renderSortIndicator('name')}
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('phone')}>
                                    <div className="flex items-center">
                                        Phone
                                        {renderSortIndicator('phone')}
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('email')}>
                                    <div className="flex items-center">
                                        Email
                                        {renderSortIndicator('email')}
                                    </div>
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                                    <div className="flex items-center">
                                        Is Active
                                        {renderSortIndicator('status')}
                                    </div>
                                </TableHead>
                                <TableHead className="w-[70px] text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>{contact.id}</TableCell>
                                    <TableCell>{contact.name}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={'outline'}
                                            className={contact.status === 'active' ? 'border-green-200 bg-green-50 text-green-700' : ''}
                                        >
                                            {contact.status === 'active' ? 'Yes' : 'No'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="hover:bg-muted/100 h-8 w-8 cursor-pointer"
                                                onClick={() => router.visit(route('contacts.edit', contact.id))}
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                                <span className="sr-only">Edit contact</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive/10 h-8 w-8 cursor-pointer"
                                                onClick={() => {
                                                    if (confirm(`Are you sure you want to delete ${contact.name}?`)) {
                                                        router.delete(route('contacts.destroy', contact.id), {
                                                            preserveScroll: true,
                                                            preserveState: true,
                                                            only: ['contacts', 'pagination'],
                                                            onSuccess: () => {
                                                                toast.success('Contact deleted successfully');
                                                            },
                                                        });
                                                    }
                                                }}
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                                <span className="sr-only">Delete contact</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-800">
                            <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-medium">No contacts found</h3>
                        <p className="mb-4 max-w-md text-sm text-gray-500 dark:text-gray-400">
                            {search
                                ? `No contacts matching "${search}"`
                                : "You don't have any contacts yet. Create your first contact to get started."}
                        </p>
                        <Button onClick={() => router.visit(route('contacts.create'))}>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Contact
                        </Button>
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between px-4">
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="size-8 cursor-pointer"
                            size="icon"
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={!pagination.current_page || pagination.current_page === 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8 cursor-pointer"
                            size="icon"
                            onClick={() => handlePageChange(pagination.current_page + 1)}
                            disabled={!pagination.current_page || pagination.current_page === pagination.last_page}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Contact;
