import { Payment, columns } from './columns';
import { DataTable } from './data-table';

function getData(): Payment[] {
    return [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
        {
            id: '489e1d42',
            amount: 125,
            status: 'processing',
            email: 'john@example.com',
        },
        {
            id: 'a2b8c970',
            amount: 250,
            status: 'success',
            email: 'sara@example.com',
        },
        {
            id: 'f1e3d7c9',
            amount: 75,
            status: 'failed',
            email: 'dave@example.com',
        },
        {
            id: 'b5d9e2a7',
            amount: 320,
            status: 'success',
            email: 'lisa@example.com',
        },
        {
            id: 'c7f8e3b6',
            amount: 150,
            status: 'pending',
            email: 'alex@example.com',
        },
        {
            id: 'd4e9f2a1',
            amount: 200,
            status: 'success',
            email: 'kate@example.com',
        },
        {
            id: 'e1d8c3b5',
            amount: 80,
            status: 'failed',
            email: 'mike@example.com',
        },
        {
            id: 'f9c7b2a3',
            amount: 175,
            status: 'processing',
            email: 'emma@example.com',
        },
        {
            id: 'a1b2c3d4',
            amount: 300,
            status: 'success',
            email: 'tom@example.com',
        },
        {
            id: 'b3c4d5e6',
            amount: 95,
            status: 'pending',
            email: 'hannah@example.com',
        },
        {
            id: 'c5d6e7f8',
            amount: 220,
            status: 'processing',
            email: 'jason@example.com',
        },
        {
            id: 'd7e8f9a1',
            amount: 60,
            status: 'failed',
            email: 'rachel@example.com',
        },
        {
            id: 'e9f1a2b3',
            amount: 350,
            status: 'success',
            email: 'daniel@example.com',
        },
        {
            id: 'f2a3b4c5',
            amount: 110,
            status: 'pending',
            email: 'olivia@example.com',
        },
        {
            id: 'a4b5c6d7',
            amount: 275,
            status: 'success',
            email: 'noah@example.com',
        },
        {
            id: 'b6c7d8e9',
            amount: 130,
            status: 'processing',
            email: 'sophia@example.com',
        },
        {
            id: 'c8d9e1f2',
            amount: 90,
            status: 'failed',
            email: 'ethan@example.com',
        },
        {
            id: 'd1e2f3a4',
            amount: 180,
            status: 'pending',
            email: 'ava@example.com',
        },
        {
            id: 'e3f4a5b6',
            amount: 260,
            status: 'success',
            email: 'william@example.com',
        },
        {
            id: 'f5a6b7c8',
            amount: 140,
            status: 'processing',
            email: 'mia@example.com',
        },
        {
            id: 'a7b8c9d1',
            amount: 70,
            status: 'failed',
            email: 'james@example.com',
        },
        {
            id: 'b9c1d2e3',
            amount: 310,
            status: 'success',
            email: 'charlotte@example.com',
        },
        {
            id: 'c2d3e4f5',
            amount: 120,
            status: 'pending',
            email: 'logan@example.com',
        },
        {
            id: 'd4e5f6a7',
            amount: 230,
            status: 'processing',
            email: 'amelia@example.com',
        },
    ];
}

export default function DemoPage() {
    const data = getData();

    return (
        <div className="container mx-auto p-20">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
