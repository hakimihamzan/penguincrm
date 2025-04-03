import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';
import { columns, Payment } from './columns';
import { DataTable } from './data-table';

type PaymentProps = {
    payments: Payment[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

export default function Index({ payments, pagination }: PaymentProps) {
    return (
        <>
            <Head title="Payment" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div className="mb-8">
                    <h1 className="text-lg font-bold">Payment</h1>
                    <p>You can manage all your payments here.</p>
                    <p className='text-muted-foreground mt-2'>Implementing TanStack data-table with InertiaJs</p>
                </div>
                <DataTable columns={columns} payments={payments} pagination={pagination} />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <Layout children={page} />;
