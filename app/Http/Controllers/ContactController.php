<?php

namespace App\Http\Controllers;

use App\Http\Requests\Contact\ContactIndexRequest;
use App\Http\Requests\Contact\ContactStoreRequest;
use App\Http\Requests\Contact\ContactUpdateRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
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

        return Inertia::render('contact/index', [
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

    /**
     * Show the contact creation form.
     */
    public function create(): Response
    {
        return Inertia::render('contact/create');
    }

    /**
     * Store the contact.
     */
    public function Store(Contact $contact, ContactStoreRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $contact = Contact::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? null,
            'status' => $input['status'],
            'city' => $input['city'] ?? null,
            'country' => $input['country'] ?? null,
            'company' => $input['company'] ?? null,
            'job_title' => $input['job_title'] ?? null,
            'notes' => $input['notes'] ?? null,
            'avatar' => $input['avatar'] ?? null,
        ]);

        return Redirect::route('contacts.edit', ['contact' => $contact->id])->with('success', 'Contact created.');
    }

    /**
     * Show the contact edit form.
     */
    public function edit(Contact $contact): Response
    {
        return Inertia::render('contact/edit', [
            'contact' => new ContactResource($contact),
        ]);
    }

    /**
     * Update the contact.
     */
    public function update(Contact $contact, ContactUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $contact->update([
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? null,
            'status' => $input['status'],
            'city' => $input['city'] ?? null,
            'country' => $input['country'] ?? null,
            'company' => $input['company'] ?? null,
            'job_title' => $input['job_title'] ?? null,
            'notes' => $input['notes'] ?? null,
            'avatar' => $input['avatar'] ?? null,
        ]);

        return Redirect::route('contacts.index')->with('success', 'Contact updated.');
    }

    /**
     * Destroy the contact.
     */
    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return Redirect::back()->with('success', 'Contact deleted.');
    }
}
