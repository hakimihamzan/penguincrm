import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';

function Profile() {
    return (
        <Layout>
            <Head title="Profile" />
            <div>Profile</div>
        </Layout>
    );
}

/**
 * @ kimi_rant
 *
 * This is not the correct way to do peristent layout in Inertia.js.
 * By doing normal React way of layout, when navigating to other page,
 * the layout will be destroyed and re-rendered.
 *
 * To test this out, play the podcast in the profile page then navigate to other page.
 * You will see the podcast stopped and re-rendered again. But if you go other pages that
 * uses persistent layout, the podcast will not be stopped.
 *
 * Check out other pages for persistent layout.
 *
 * For more info: https://inertiajs.com/pages#persistent-layouts
 *
 */
export default Profile;
