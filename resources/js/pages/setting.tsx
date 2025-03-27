import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function Setting() {
    return (
        <>
            <Head title="Setting" />
            <div>Setting</div>
        </>
    );
}

Setting.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Setting;
