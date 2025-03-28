import AppearanceTab from '@/components/appearance-tab';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProfileLayout from '@/layouts/app/profile-layout';

function Appearance() {
    return (
        <ProfileLayout>
            <Card className="w-full max-w-2xl rounded">
                <CardHeader>
                    <CardTitle>Application Theme</CardTitle>
                    <CardDescription>Update your prefered application theme.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AppearanceTab />
                </CardContent>
            </Card>
        </ProfileLayout>
    );
}

export default Appearance;
