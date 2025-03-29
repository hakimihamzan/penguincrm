import Layout from '@/layouts/app/app-layout';
import { Head, usePage } from '@inertiajs/react';

type Contact = {
    id: number;
    name: string;
    email: string;
    phone?: string;
    city?: string;
    country?: string;
    company?: string;
    job_title?: string;
    notes?: string;
    status: 'active' | 'inactive';
    avatar?: string;
}

type ContactProps = {
    contacts: {
        data: Contact[];
    }
    filters: {
        name?: string;
        email?: string;
        phone?: string;
        status?: string;
        sort_by?: string;
        sort_order?: string;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

function Contact({contacts, filters, pagination}: ContactProps) {
    let contactList = contacts.data;

    let pagesss = usePage();
    console.log(pagesss, contacts, filters, pagination);

    return (
        <>
            <Head title="Contact" />
            <div>Contact</div>
            {/* list of contact */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contactList.map(contact => (
                    <div key={contact.id} className="p-4 border rounded">
                        <img src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full" />
                        <h2 className="text-lg font-bold">{contact.name}</h2>
                        <p>{contact.email}</p>
                        <p>{contact.phone}</p>
                        <p>{contact.city}, {contact.country}</p>
                        <p>{contact.company}</p>
                        <p>{contact.job_title}</p>
                        <p>{contact.notes}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

Contact.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Contact;
