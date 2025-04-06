import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Organization } from '.';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    organizations: Organization[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export function DataTable<TData, TValue>({ columns, organizations, pagination }: DataTableProps<TData, TValue>) {
    const params = new URLSearchParams(window.location.search);

    const sort_by = params.get('sort_by');
    const sort_order = params.get('sort_order');

    const [data] = useState<TData[]>(organizations as TData[]);
    const [pageIndex] = useState(pagination.current_page - 1); // Tanstack Table uses 0-based index
    const [pageSize] = useState(pagination.per_page); // translated : 'per_page' => 'pageSize'
    const [sorting] = useState<SortingState>(() => {
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

    const table = useReactTable({
        data,
        columns,
        pageCount: pagination.last_page,
        manualPagination: true,
        manualSorting: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
            sorting,
        },
    });

    return (
        <>
            {pagination.total > 0 ? (
                <div className="mt-16">
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
                                        <TableRow key={row.id}>
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
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => {
                                table.previousPage();
                            }}
                            asChild={pagination.current_page > 1}
                        >
                            <Link
                                href={route('organizations.index', {
                                    page: pagination.current_page - 1,
                                    per_page: pageSize,
                                    sort_by: params.get('sort_by') || undefined,
                                    sort_order: params.get('sort_order') || undefined,
                                })}
                                preserveScroll
                            >
                                Previous
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!table.getCanNextPage()}
                            onClick={() => {
                                table.nextPage();
                            }}
                            asChild={pagination.current_page < pagination.last_page}
                        >
                            <Link
                                href={route('organizations.index', {
                                    page: pagination.current_page + 1,
                                    per_page: pageSize,
                                    sort_by: params.get('sort_by') || undefined,
                                    sort_order: params.get('sort_order') || undefined,
                                })}
                                preserveScroll
                            >
                                Next
                            </Link>
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
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    </div>
                    <h3 className="mb-2 text-lg font-medium">No organizations found</h3>
                    <p className="text-muted-foreground mb-4 text-center">There are no organization records in the system yet.</p>
                </div>
            )}
        </>
    );
}
