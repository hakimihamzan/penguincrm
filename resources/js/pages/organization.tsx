import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function Organization() {
    return (
        <>
            <Head title="Organization" />
            <div>Organization</div>
        </>
    );
}

Organization.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Organization;
