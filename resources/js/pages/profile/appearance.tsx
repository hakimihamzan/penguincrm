import AppearanceTab from '@/components/appearance-tab';
import { ProfileNavigation } from '@/components/profile-navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

export default function Appearance() {
    return (
        <>
            <Head title="Profile" />

            <Card className="w-full max-w-2xl rounded">
                <CardHeader>
                    <CardTitle>Application Theme</CardTitle>
                    <CardDescription>Update your prefered application theme.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AppearanceTab />
                </CardContent>
            </Card>
        </>
    );
}

Appearance.layout = (page: React.ReactNode) => (
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
