import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Organization } from './index';

export const columns: ColumnDef<Organization>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    #
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    Name
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    Phone
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: 'country',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    Country
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: 'employee_count',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    Employee Count
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
    },
    {
        accessorKey: 'is_active',
        header: ({ column }) => {
            return (
                <Link
                    href={route('organizations.index', {
                        page: 1,
                        per_page: 10,
                        sort_order: column.getIsSorted() === 'asc' || !column.getIsSorted() ? 'desc' : 'asc',
                        sort_by: column.id,
                    })}
                    className="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 flex h-9 items-center gap-2 px-4 py-2 has-[>svg]:px-3"
                >
                    Is Active?
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className="h-4 w-4" />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className="h-4 w-4" />
                    ) : (
                        <ArrowUpDown className="h-4 w-4 opacity-50" />
                    )}
                </Link>
            );
        },
        cell: ({ row }) => {
            const isActive = row.getValue('is_active') ? 'Yes' : 'No';

            return (
                <Badge variant={'outline'} className={isActive === 'Yes' ? 'border-green-200 bg-green-50 text-green-700' : ''}>
                    {isActive}
                </Badge>
            );
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
                            <DropdownMenuItem asChild>
                                <Link href={route('organizations.edit', organization.id)}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${organization.name}?`)) {
                                        router.delete(route('organizations.destroy', organization.id), {
                                            preserveState: false,
                                            onSuccess: () => {
                                                toast.success(`Organization : ${organization.name} deleted successfully`);
                                            },
                                        });
                                    }
                                }}
                                className="text-destructive focus:text-destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
