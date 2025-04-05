<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserUpdateAvatarRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the users list.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('user', []);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(UserUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $request->user()->fill($input);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.me');
    }

    public function updateAvatar(UserUpdateAvatarRequest $request)
    {
        /** @var User */
        $user = Auth::user();

        $input = $request->validated();

        $avatar = $input['avatar'];
        $imageName = now()->format('Y_m_d_H_i_s') . '__' . $user->id  . '__' . $avatar->hashName();

        $path = $avatar->storeAs('avatars', $imageName, 'public');

        // delete the old image if it exists
        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->avatar = $path;
        $user->save();

        return to_route('profile.me');
    }
}
