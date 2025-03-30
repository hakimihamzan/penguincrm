<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\ContactIndexRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Show the contacts list.
     */
    public function index(ContactIndexRequest $request): Response
    {
        $validated = $request->validated();

        $validated['sort_by'] = $validated['sort_by'] ?? 'name';
        $validated['sort_order'] = $validated['sort_order'] ?? 'asc';

        $validated = optional($validated);

        $contacts = Contact::query()
            // filtering
            ->when($validated['search'], function ($query, $name) {
                return $query->where('name', 'like', "%{$name}%")
                    ->orWhere('email', 'like', "%{$name}%")
                    ->orWhere('phone', 'like', "%{$name}%");
            })
            ->when($validated['status'], function ($query, $status) {
                return $query->where('status', $status);
            })
            // sorting
            ->when($validated['sort_by'], function ($query, $sortBy) use ($validated) {
                return $query->orderBy($sortBy, $validated['sort_order'] ?? 'asc');
            })
            ->paginate($validated['per_page'] ?? 10, page: $validated['page'] ?? 1)
            ->withQueryString();

        return Inertia::render('contact', [
            'contacts' => ContactResource::collection($contacts->items()),
            'filters' => [
                'name' => $validated['name'] ?? null,
                'email' => $validated['email'] ?? null,
                'phone' => $validated['phone'] ?? null,
                'status' => $validated['status'] ?? null,
                'sort_by' => $validated['sort_by'] ?? null,
                'sort_order' => $validated['sort_order'] ?? null,
            ],
            'pagination' => [
                'current_page' => $contacts->currentPage(),
                'last_page' => $contacts->lastPage(),
                'per_page' => $contacts->perPage(),
                'total' => $contacts->total(),
            ],
        ]);
    }
}
