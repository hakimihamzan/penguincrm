<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\UserController;
use App\Models\Contact;
use App\Models\Organization;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $sixMonthsAgo = now()->subMonths(6);

        $organizations = Organization::where('created_at', '>=', $sixMonthsAgo)
            ->get(['created_at']);

        $organizationsByMonth = $organizations->groupBy(function ($item) {
            return $item->created_at->format('Y-m');
        });

        $organizationCreatedLastSixMonths = collect($organizationsByMonth)
            ->map(function ($items, $yearMonth) {
                $date = Carbon::createFromFormat('Y-m', $yearMonth);

                return [
                    'month' => $date->format('F'),
                    'desktop' => $items->count(),
                ];
            })
            ->sortBy('month')
            ->values();

        $organizationsBySize = DB::table('organizations')
            ->select(
                DB::raw('CASE
                    WHEN employee_count BETWEEN 1 AND 10 THEN "micro"
                    WHEN employee_count BETWEEN 11 AND 50 THEN "small"
                    WHEN employee_count BETWEEN 51 AND 250 THEN "medium"
                    WHEN employee_count BETWEEN 251 AND 1000 THEN "large"
                    ELSE "enterprise"
                END as category'),
                DB::raw('count(*) as value')
            )
            ->groupBy('category')
            ->get();

        // Then sort the collection in PHP instead of SQL
        $organizationsBySize = $organizationsBySize->sortBy(function ($item) {
            $order = [
                'micro' => 1,
                'small' => 2,
                'medium' => 3,
                'large' => 4,
                'enterprise' => 5,
            ];

            return $order[$item->category] ?? 999;
        })->values();

        $activeUsers = User::where('updated_at', '>=', now()->subDays(30))->count();
        $inactiveUsers = User::where('updated_at', '<', now()->subDays(30))->orWhereNull('email_verified_at')->count();

        $paymentStatusData = DB::table('payments')
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                $fillColor = match ($item->status) {
                    'success' => '#10b981',
                    'pending' => '#f59e0b',
                    'failed' => '#ef4444',
                    default => '#94a3b8',
                };

                return [
                    'status' => $item->status,
                    'count' => $item->count,
                    'fill' => $fillColor,
                ];
            });

        $contactCount = Contact::count();
        $organizationCount = Organization::count();
        $userCount = User::count();
        $totalPayment = Payment::sum('amount');

        return Inertia::render('dashboard', [
            'contact_count' => $contactCount,
            'organization_count' => $organizationCount,
            'user_count' => $userCount,
            'total_payment' => $totalPayment,
            'organization_created_info' => $organizationCreatedLastSixMonths,
            'organizations_by_size' => $organizationsBySize,
            'user_activity' => [
                [
                    'month' => date('F Y'),
                    'active' => $activeUsers,
                    'inactive' => $inactiveUsers,
                ],
            ],
            'payment_status_data' => $paymentStatusData,
        ]);
    })->name('dashboard');

    Route::group(['prefix' => 'contacts'], function () {
        Route::get('/', [ContactController::class, 'index'])->name('contacts.index');
        Route::get('/edit/{contact}', [ContactController::class, 'edit'])->name('contacts.edit');
        Route::put('/{contact}', [ContactController::class, 'update'])->name('contacts.update');
        Route::get('/create', [ContactController::class, 'create'])->name('contacts.create');
        Route::post('/', [ContactController::class, 'store'])->name('contacts.store');
        Route::delete('/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    });

    Route::group(['prefix' => 'organizations'], function () {
        Route::get('/', [OrganizationController::class, 'index'])->name('organizations.index');
        Route::get('/edit/{organization}', [OrganizationController::class, 'edit'])->name('organizations.edit');
        Route::put('/{organization}', [OrganizationController::class, 'update'])->name('organizations.update');
        Route::delete('/{organization}', [OrganizationController::class, 'destroy'])->name('organizations.destroy');
    });

    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'index'])->name('users.index');
    });

    Route::group(['prefix' => 'profile'], function () {
        Route::get('/me', function () {
            return Inertia::render('profile/index');
        })->name('profile.me');

        Route::post('/avatar', [UserController::class, 'updateAvatar'])->name('profile.avatar');

        Route::post('/me', [UserController::class, 'update'])->name('profile.update');

        Route::get('/appearance', function () {
            return Inertia::render('profile/appearance');
        })->name('profile.appearance');

        Route::get('/password', function () {
            return Inertia::render('profile/password');
        })->name('profile.password');

        Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
    });

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
});

require __DIR__.'/auth.php';
