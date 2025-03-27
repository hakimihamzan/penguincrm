import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function Contact() {
    return (
        <>
            <Head title="Contact" />
            <div>Contact</div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Contact;
