import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Payment } from './columns';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    payments: Payment[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export function DataTable<TData, TValue>({ columns, payments, pagination }: DataTableProps<TData, TValue>) {
    const params = new URLSearchParams(window.location.search);

    const sort_by = params.get('sort_by');
    const sort_order = params.get('sort_order');

    const [data, setData] = useState<TData[]>(payments as TData[]);
    const [pageIndex, setPageIndex] = useState(pagination.current_page - 1); // Tanstack Table uses 0-based index
    const [pageSize, setPageSize] = useState(pagination.per_page); // translated : 'per_page' => 'pageSize'
    const [sorting, setSorting] = useState<SortingState>(() => {
        if (sort_by && sort_order) {
            return [
                {
                    id: sort_by,
                    desc: sort_order === 'desc',
                },
            ];
        }
        return [];
    });
    const [search, setSearch] = useState<string>(params.get('search') || '');

    const table = useReactTable({
        data,
        columns,
        pageCount: pagination.last_page,
        manualPagination: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: (updater) => {
            const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
            setSorting(newSorting);

            /**
             * @ kimi_rant ::  First way to re-fetch data for current page
             */
            const params: {
                per_page: number;
                page: number;
                search?: string;
            } = {
                per_page: pageSize,
                page: pageIndex + 1,
            };

            if (search) {
                params.search = search;
            }

            router.visit(route('payments.index'), {
                method: 'get',
                data: {
                    ...params,
                    ...{
                        sort_by: newSorting[0]?.id,
                        sort_order: newSorting[0]?.desc ? 'desc' : 'asc',
                    },
                },
                preserveScroll: true,
                preserveState: true,
                only: ['payments', 'pagination'],
                onSuccess: (page) => {
                    setData(page.props.payments as TData[]);
                },
            });
        },
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
            sorting,
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;

            // Store current values
            const oldPageIndex = pageIndex;
            const oldPageSize = pageSize;

            // Update local state
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);

            if (newPagination.pageIndex !== oldPageIndex || newPagination.pageSize !== oldPageSize) {
                /**
                 * @ kimi_rant ::  Second way to re-fetch data for current page
                 */
                const url = new URL(window.location.href);
                url.searchParams.set('page', (newPagination.pageIndex + 1).toString());
                url.searchParams.set('per_page', newPagination.pageSize.toString());

                if (sort_by) {
                    url.searchParams.set('sort_by', sort_by);
                    url.searchParams.set('sort_order', sort_order || 'asc');
                }

                window.history.pushState({}, '', url.toString());

                router.reload({
                    onSuccess: (page) => {
                        setData(page.props.payments as TData[]);
                    },
                    only: ['payments', 'pagination'],
                });
            }
        },
    });

    return (
        <>
            {pagination.total > 0 ? (
                <div className="mt-8">
                    <div className="flex items-center gap-2 py-4">
                        <Input
                            placeholder="Filter emails..."
                            value={search}
                            onChange={(event) => {
                                const newSearch = event.target.value;
                                setSearch(newSearch);

                                // Reset to page 1 when searching
                                setPageIndex(0);

                                // Update URL and fetch data
                                const url = new URL(window.location.href);
                                url.searchParams.set('page', '1');

                                if (newSearch) {
                                    url.searchParams.set('search', newSearch);
                                } else {
                                    url.searchParams.delete('search');
                                }

                                // Preserve sorting parameters
                                if (sorting.length > 0) {
                                    url.searchParams.set('sort_by', sorting[0].id);
                                    url.searchParams.set('sort_order', sorting[0].desc ? 'desc' : 'asc');
                                }

                                window.history.pushState({}, '', url.toString());

                                router.reload({
                                    onSuccess: (page) => {
                                        setData(page.props.payments as TData[]);
                                    },
                                    only: ['payments', 'pagination'],
                                });
                            }}
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="px-5">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="text-muted-foreground my-3 flex-1 text-sm">
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="mt-16 flex flex-col items-center justify-center border border-dashed py-12">
                    <div className="bg-muted mb-4 rounded-full p-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-muted-foreground h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium">No payments found</h3>
                    <p className="text-muted-foreground mb-4 text-center">There are no payment records in the system yet.</p>
                </div>
            )}
        </>
    );
}
