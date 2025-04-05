import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export type Organization = {
    id: string;
    name: string;
    phone: string;
    website: string;
    country: string;
    employee_count: string;
    is_active: boolean;
};

export const columns: ColumnDef<Organization>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    #
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}{' '}
                </Button>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}{' '}
                </Button>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: () => <div className="">Phone</div>,
    },
    {
        accessorKey: 'website',
        header: () => <div className="">Website</div>,
    },
    {
        accessorKey: 'country',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Country
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}{' '}
                </Button>
            );
        },
    },
    {
        accessorKey: 'employee_count',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Employee Count
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}{' '}
                </Button>
            );
        },
    },
    {
        accessorKey: 'is_active',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Is Active?
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}{' '}
                </Button>
            );
        },
        cell: ({ row }) => {
            const isActive = row.getValue('is_active') ? 'Yes' : 'No';

            return <div className="">{isActive}</div>;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const organization = row.original;

            return (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
