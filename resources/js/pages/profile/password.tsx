import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ProfileLayout from '@/layouts/app/profile-layout';
import { Head, useForm } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Password has been updated', {
                    description: 'Your password has been changed successfully.',
                });
            },
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <ProfileLayout>
            <Head title="Update Password" />
            <Card className="w-full max-w-2xl rounded">
                <CardHeader>
                    <CardTitle>Update Password</CardTitle>
                    <CardDescription>Ensure your account is using a strong password to stay secure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <Label htmlFor="current_password">Current Password</Label>
                                <div className="relative">
                                    <Input
                                        id="current_password"
                                        ref={currentPasswordInput}
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        value={data.current_password}
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        className="pr-10 rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 h-full px-3"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                        {showCurrentPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                        <span className="sr-only">{showCurrentPassword ? 'Hide password' : 'Show password'}</span>
                                    </Button>
                                </div>
                                {errors.current_password && <p className="text-sm text-red-500">{errors.current_password}</p>}
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        ref={passwordInput}
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="pr-10 rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 h-full px-3"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                        <span className="sr-only">{showNewPassword ? 'Hide password' : 'Show password'}</span>
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                <p className="text-muted-foreground text-xs">
                                    Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one
                                    number, and one special character.
                                </p>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="pr-10 rounded"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 h-full px-3"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                        <span className="sr-only">{showConfirmPassword ? 'Hide password' : 'Show password'}</span>
                                    </Button>
                                </div>
                                {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                            </div>
                        </div>

                        <CardFooter className="flex justify-end px-0 pt-2 pb-0">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Password'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </ProfileLayout>
    );
}

export default Password;
