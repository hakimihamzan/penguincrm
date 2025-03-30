import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/layouts/app/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface Contact {
    data: {
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
    };
}

interface EditContactProps {
    contact: Contact;
}

export default function EditContact({ contact }: EditContactProps) {
    const contactData = contact.data;

    // Use Inertia's useForm for form handling
    const { data, setData, put, processing, errors } = useForm({
        name: contactData.name || '',
        email: contactData.email || '',
        phone: contactData.phone || '',
        city: contactData.city || '',
        country: contactData.country || '',
        company: contactData.company || '',
        job_title: contactData.job_title || '',
        notes: contactData.notes || '',
        status: contactData.status || 'active',
        avatar: contactData.avatar || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put(route('contacts.update', contactData.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Contact updated successfully');
            },
            onError: () => {
                toast.error('Failed to update contact');
            },
        });
    };

    return (
        <>
            <Head title={`Edit Contact: ${contactData.name}`} />
            <div className="mx-auto md:w-2xl px-4 py-8 md:px-6 lg:px-8">
                <div className="mb-8 flex items-center">
                    <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.visit(route('contacts.index'))}>
                        <ArrowLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Back to contacts</span>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Contact</h1>
                        <p className="text-muted-foreground">Update contact information for {contactData.name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Make changes to the contact information below.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            {/* Primary Info Section */}
                            <div className="space-y-4 mb-10">
                                <h3 className="text-lg font-medium">Basic Details</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter full name"
                                        />
                                        {errors.name && <p className="text-destructive text-sm font-medium">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="email@example.com"
                                        />
                                        {errors.email && <p className="text-destructive text-sm font-medium">{errors.email}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        {errors.phone && <p className="text-destructive text-sm font-medium">{errors.phone}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <p className="text-destructive text-sm font-medium">{errors.status}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="space-y-4 pt-2 mb-10">
                                <h3 className="text-lg font-medium">Address</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="City" />
                                        {errors.city && <p className="text-destructive text-sm font-medium">{errors.city}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={data.country}
                                            onChange={(e) => setData('country', e.target.value)}
                                            placeholder="Country"
                                        />
                                        {errors.country && <p className="text-destructive text-sm font-medium">{errors.country}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Company Section */}
                            <div className="space-y-4 pt-2 mb-10">
                                <h3 className="text-lg font-medium">Company Details</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            placeholder="Company Name"
                                        />
                                        {errors.company && <p className="text-destructive text-sm font-medium">{errors.company}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="job_title">Job Title</Label>
                                        <Input
                                            id="job_title"
                                            value={data.job_title}
                                            onChange={(e) => setData('job_title', e.target.value)}
                                            placeholder="Job Title"
                                        />
                                        {errors.job_title && <p className="text-destructive text-sm font-medium">{errors.job_title}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Notes Section */}
                            <div className="space-y-4 pt-2 mb-10">
                                <h3 className="text-lg font-medium">Additional Information</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Add any additional notes about this contact..."
                                        className="h-32"
                                    />
                                    {errors.notes && <p className="text-destructive text-sm font-medium">{errors.notes}</p>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t px-6 py-4">
                            <Button type="button" variant="outline" onClick={() => router.visit(route('contacts.index'))}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}

EditContact.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
