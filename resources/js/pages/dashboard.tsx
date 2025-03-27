import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <div>Dashboard</div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Dashboard;
