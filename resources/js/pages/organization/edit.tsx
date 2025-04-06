import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/layouts/app/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';
import { Organization } from '.';

export default function EditOrganization({ organization }: { organization: Organization }) {
    const { data, setData, put, processing, errors } = useForm({
        name: organization.name,
        description: organization.description ?? '',
        logo: organization.logo ?? '',
        email: organization.email ?? '',
        phone: organization.phone ?? '',
        website: organization.website ?? '',
        city: organization.city ?? '',
        state: organization.state ?? '',
        country: organization.country ?? '',
        employee_count: organization.employee_count ?? '',
        founded_date: organization.founded_date ?? '',
        is_active: organization.is_active,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put(route('organizations.update', organization.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Organization updated successfully');
            },
            onError: () => {
                toast.error('Failed to update organization');
            },
        });
    };

    return (
        <>
            <Head title={`Edit Organization: ${organization.name}`} />
            <div className="mx-auto px-4 py-8 md:w-2xl md:px-6 lg:px-8">
                <div className="mb-8 flex items-center">
                    <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.visit(route('organizations.index'))}>
                        <ArrowLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Back to Organizations</span>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Organization</h1>
                        <p className="text-muted-foreground">Update organization information for {organization.name}</p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Organization Information</CardTitle>
                        <CardDescription>Make changes to the organization information below.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-6">
                            <div className="mb-10 space-y-4">
                                <h3 className="text-lg font-medium">Basic Details</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                                        {errors.name && <p className="text-destructive text-sm font-medium">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            type="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Description"
                                        />
                                        {errors.description && <p className="text-destructive text-sm font-medium">{errors.description}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" />
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
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            value={data.website}
                                            onChange={(e) => setData('website', e.target.value)}
                                            placeholder="google.com"
                                        />
                                        {errors.website && <p className="text-destructive text-sm font-medium">{errors.website}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={data.is_active ? 'true' : 'false'}
                                            onValueChange={(value) => setData('is_active', value === 'true')}
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">Active</SelectItem>
                                                <SelectItem value="false">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.is_active && <p className="text-destructive text-sm font-medium">{errors.is_active}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-10 space-y-4 pt-2">
                                <h3 className="text-lg font-medium">Location</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="City" />
                                        {errors.city && <p className="text-destructive text-sm font-medium">{errors.city}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input id="state" value={data.state} onChange={(e) => setData('state', e.target.value)} placeholder="State" />
                                        {errors.state && <p className="text-destructive text-sm font-medium">{errors.state}</p>}
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

                            <div className="mb-10 space-y-4 pt-2">
                                <h3 className="text-lg font-medium">Company Details</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="employee_count">Number of Employees</Label>
                                        <Input
                                            id="employee_count"
                                            value={data.employee_count}
                                            onChange={(e) => setData('employee_count', e.target.value)}
                                            type="number"
                                            placeholder="100"
                                        />
                                        {errors.employee_count && <p className="text-destructive text-sm font-medium">{errors.employee_count}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="founded_date">Founded Date</Label>
                                        <Input
                                            id="founded_date"
                                            value={data.founded_date}
                                            onChange={(e) => setData('founded_date', e.target.value)}
                                            type="date"
                                            placeholder="Founded Date"
                                        />
                                        {errors.founded_date && <p className="text-destructive text-sm font-medium">{errors.founded_date}</p>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t px-6 py-4">
                            <Button type="button" variant="outline" onClick={() => router.visit(route('organizations.index'))}>
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

EditOrganization.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
