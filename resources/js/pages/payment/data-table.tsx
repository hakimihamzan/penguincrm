import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
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

export function DataTable<TData, TValue>({ columns, payments, pagination }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const [data, setData] = useState<TData[]>(payments as TData[]);
    const [pageIndex, setPageIndex] = useState(pagination.current_page - 1); // 0-indexed for TanStack
    const [pageSize, setPageSize] = useState(pagination.per_page);
    const [pageCount, setPageCount] = useState(pagination.last_page);

    useEffect(() => {
        setData(payments as TData[]);
        setPageIndex(pagination.current_page - 1);
        setPageSize(pagination.per_page);
        setPageCount(pagination.last_page);
    }, [payments, pagination]);

    const handlePageChange = (newPageIndex: number) => {
        // Don't fetch if we're already on this page
        if (newPageIndex === pageIndex) return;

        router.get(
            route('payment.index'),
            {
                page: newPageIndex + 1, // Convert to 1-indexed for backend
                per_page: pageSize,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['payments', 'pagination'],
            },
        );
    };

    const handlePageSizeChange = (newPageSize: number) => {
        router.get(
            route('payment.index'),
            {
                page: 1, // Reset to first page when changing page size
                per_page: newPageSize,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ['payments', 'pagination'],
            },
        );
    };

    const table = useReactTable({
        data,
        columns,
        manualPagination: true, // Enable manual pagination
        pageCount,
        rowCount: pagination.total,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;

            // Check what changed before updating state
            const pageSizeChanged = newPagination.pageSize !== pageSize;
            const pageIndexChanged = newPagination.pageIndex !== pageIndex;

            // Update local state
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);

            // Handle API calls
            if (pageSizeChanged) {
                handlePageSizeChange(newPagination.pageSize);
            } else if (pageIndexChanged) {
                handlePageChange(newPagination.pageIndex);
            }
        },
    });

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
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
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
    );
}
