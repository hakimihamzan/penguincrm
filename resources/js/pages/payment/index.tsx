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
        <div className="container mx-auto p-20">
            <DataTable columns={columns} payments={payments} pagination={pagination} />
        </div>
    );
}
