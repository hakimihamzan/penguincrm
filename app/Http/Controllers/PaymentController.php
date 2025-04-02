<?php

namespace App\Http\Controllers;

use App\Http\Requests\Payment\PaymentIndexRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    /**
     * Show the organizations list.
     */
    public function index(PaymentIndexRequest $request): Response
    {
        $validated = $request->validated();

        $validated['sort_by'] = $validated['sort_by'] ?? 'id';
        $validated['sort_order'] = $validated['sort_order'] ?? 'asc';

        $validated = optional($validated);

        $payments = Payment::query()
            // filtering
            ->when($validated['search'], function ($query, $search) {
                return $query->where(function ($query) use ($search) {
                    $query->where('status', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            // sorting
            ->when($validated['sort_by'], function ($query, $sortBy) use ($validated) {
                return $query->orderBy($sortBy, $validated['sort_order'] ?? 'asc');
            })
            ->paginate($validated['per_page'] ?? 10, page: $validated['page'] ?? 1)
            ->withQueryString();

        return Inertia::render('payment/index', [
            'payments' => $payments->through(function ($payment) {
                return (new PaymentResource($payment))->toArray(request());
            })->values()->all(),
            'pagination' => [
                'current_page' => $payments->currentPage(),
                'last_page' => $payments->lastPage(),
                'per_page' => $payments->perPage(),
                'total' => $payments->total(),
            ],
        ]);
    }
}
