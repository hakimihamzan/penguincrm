import { ProfileNavigation } from '@/components/profile-navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInitials } from '@/hooks/use-initials';
import Layout from '@/layouts/app/app-layout';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Profile() {
    const user = usePage<SharedData>().props.auth.user;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        photo: null as File | null, // TODO impplement file upload
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post('/profile/me', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Profile has been updated.');
            },
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('photo', file);

            // Create preview URL
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const getInitials = useInitials();

    return (
        <>
            <Head title="Profile" />

            <Card className="w-full max-w-2xl rounded">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account's profile information and email address.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                            <div className="relative mr-2 flex flex-col items-center gap-1">
                                <Avatar className="border-border h-24 w-24 border-2">
                                    <AvatarImage src={preview || user.avatar} />
                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <Button type="button" size="sm" variant="outline" className="mt-2 w-full" onClick={triggerFileInput}>
                                    Change Photo
                                </Button>
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                            </div>

                            <div className="w-full flex-1 space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        className="rounded"
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        className="rounded"
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>
                            </div>
                        </div>

                        <CardFooter className="flex justify-end px-0 pb-0">
                            <Button className="rounded" type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

Profile.layout = (page: React.ReactNode) => (
    <Layout>
        <div className="px-16 py-10">
            <div className="mb-10">
                <h1 className="text-lg font-bold">Profile</h1>
                <p>Manage your profile.</p>
            </div>
            <div>
                <ProfileNavigation />
                <div className="mt-10 sm:mt-0">{page}</div>
            </div>
        </div>
    </Layout>
);

/**
 * @ kimi_rant
 *
 * This is the correct way to do peristent layout in Inertia.js.
 * If you are doing normal React way of layout, when navigating to other page,
 * the layout will be destroyed and re-rendered.
 *
 * REACT STYLE LAYOUT
 * <Layout>{page}</Layout>
 *
 * instead of
 *
 * INERTIA PERSISTENT LAYOUT
 * Profile.layout = (page: React.ReactNode) => <Layout children={page} />;
 *
 *
 * To test this out, convert the layout to be react style layout, enter something into the right top
 * searchbar, then navigate to other page. You will see the input is reset and re-rendered again.
 * But if you go to other pages that uses persistent layout, the input will stay the same.
 *
 * For more info: https://inertiajs.com/pages#persistent-layouts
 *
 */
