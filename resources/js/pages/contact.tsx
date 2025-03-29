import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

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

function Contact({ contacts, pagination }: ContactProps) {
    const contactList = contacts.data;

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
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Is Active</TableHead>
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
                <div className="mt-6 flex w-full items-center justify-between gap-8 px-4">
                    <div className="hidden items-center gap-2 lg:flex">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">
                            Rows per page
                        </Label>
                        <Select value={`10`} onValueChange={(value) => {}}>
                            <SelectTrigger className="w-20" id="rows-per-page">
                                <SelectValue placeholder={'10'} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                        Page {pagination.current_page} of {pagination.last_page}
                    </div>
                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            // onClick={}
                            // disabled={}
                        >
                            <span className="sr-only">Go to first page</span>
                            <ChevronsLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            // onClick={}
                            // disabled={}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="size-8"
                            size="icon"
                            // onClick={}
                            // disabled={}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRightIcon />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden size-8 lg:flex"
                            size="icon"
                            // onClick={}
                            // disabled={}
                        >
                            <span className="sr-only">Go to last page</span>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Contact;
