import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/layouts/app/app-layout';
import { Head, router } from '@inertiajs/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';

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
    contacts: {
        data: Contact[];
    };
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
    const contactList = contacts.data;

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
                <div className="mb-10">
                    <h1 className="text-lg font-bold">Contact</h1>
                    <p>You can manage all your contacts here.</p>
                </div>
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
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {contactList.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>{contact.id}</TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>
                                    <Badge variant={'outline'} className={''}>
                                        {contact.status === 'active' ? 'Yes' : 'No'}
                                    </Badge>
                                </TableCell>
                                <TableCell>TODO</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="mt-6 flex items-center justify-between px-4">
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            onClick={() => handlePageChange(pagination.current_page - 1)}
                            disabled={!pagination.current_page || pagination.current_page === 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
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
