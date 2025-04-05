import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';
import { columns } from './columns';
import { DataTable } from './data-table';

export type Organization = {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    email?: string;
    phone?: string;
    website?: string;
    city?: string;
    state?: string;
    country?: string;
    employee_count?: string;
    founded_date?: string;
    is_active: boolean;
};

type OrganizationProps = {
    organizations: Organization[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

function Index({ organizations, pagination }: OrganizationProps) {
    return (
        <>
            <Head title="Organization" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div>
                    <h1 className="text-lg font-bold">Organization</h1>
                    <p>You can manage all your organizations here.</p>
                    <p className="text-muted-foreground mt-2">Implementing TanStack data-table with InertiaJs &lt; Link &gt;</p>
                </div>
                <DataTable columns={columns} organizations={organizations} pagination={pagination} />
            </div>
        </>
    );
}

Index.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Index;
