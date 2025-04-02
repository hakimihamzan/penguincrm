import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
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

const params = new URLSearchParams(window.location.search);

export function DataTable<TData, TValue>({ columns, payments, pagination }: DataTableProps<TData, TValue>) {
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

    useEffect(() => {
        setData(payments as TData[]);
    }, [payments]);

    useEffect(() => {
        setPageIndex(pagination.current_page - 1);
        setPageSize(pagination.per_page);
    }, [pagination]);

    const syncWithServer = (params: { pageIndex?: number; pageSize?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string }) => {
        // Create a clean object with current values as defaults
        const requestParams = {
            page: (params.pageIndex !== undefined ? params.pageIndex : pageIndex) + 1,
            per_page: params.pageSize !== undefined ? params.pageSize : pageSize,
            sort_by: params.sortBy,
            sort_order: params.sortOrder,
            search: params.search !== undefined ? params.search : search || undefined,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cleanParams = Object.fromEntries(Object.entries(requestParams).filter(([_key, v]) => v !== undefined));

        router.get(route('payments.index'), cleanParams, {
            preserveState: true,
            preserveScroll: true,
            only: ['payments', 'pagination'],
        });
    };

    // debounced search
    useEffect(() => {
        const handler = setTimeout(() => {
            syncWithServer({
                pageIndex: 0, // Reset to first page when filter changes
                search: search || undefined,
            });
        }, 300);

        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

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

            if (newSorting.length > 0) {
                syncWithServer({
                    sortBy: newSorting[0].id,
                    sortOrder: newSorting[0].desc ? 'desc' : 'asc',
                    pageIndex: 0, // Reset to first page when sorting changes
                    search: search || undefined,
                });
            } else {
                syncWithServer({
                    sortBy: undefined,
                    sortOrder: undefined,
                    pageIndex: 0,
                    search: search || undefined,
                });
            }
        },
        getFilteredRowModel: getFilteredRowModel(),
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

            // Only sync if something actually changed
            if (newPagination.pageIndex !== oldPageIndex || newPagination.pageSize !== oldPageSize) {
                const currentSort =
                    sorting.length > 0
                        ? {
                              sortBy: sorting[0].id,
                              sortOrder: sorting[0].desc ? ('desc' as const) : ('asc' as const),
                          }
                        : {};

                syncWithServer({
                    pageIndex: newPagination.pageIndex,
                    pageSize: newPagination.pageSize,
                    search: search || undefined, // Add the search parameter
                    ...currentSort,
                });
            }
        },
    });

    return (
        <>
            <div className="flex items-center gap-2 py-4">
                <Input placeholder="Filter emails..." value={search} onChange={(event) => setSearch(event.target.value)} className="max-w-sm" />
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
        </>
    );
}
