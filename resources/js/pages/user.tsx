import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function User() {
    return (
        <>
            <Head title="User" />
            <div>User</div>
        </>
    );
}

User.layout = (page: React.ReactNode) => <Layout children={page} />;

export default User;
