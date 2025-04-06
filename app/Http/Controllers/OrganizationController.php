<?php

namespace App\Http\Controllers;

use App\Http\Requests\Organization\OrganizationUpdateRequest;
use App\Http\Requests\Organization\OrganizationIndexRequest;
use App\Http\Resources\OrganizationResource;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    /**
     * Show the organizations list.
     */
    public function index(OrganizationIndexRequest $request): Response
    {
        $validated = $request->validated();

        $validated['sort_by'] = $validated['sort_by'] ?? 'id';
        $validated['sort_order'] = $validated['sort_order'] ?? 'asc';

        $validated = optional($validated);

        $organizations = Organization::query()
            // filtering
            ->when($validated['search'], function ($query, $search) {
                return $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('state', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%");
                });
            })
            // sorting
            ->when($validated['sort_by'], function ($query, $sortBy) use ($validated) {
                return $query->orderBy($sortBy, $validated['sort_order']);
            })
            ->paginate($validated['per_page'] ?? 10, page: $validated['page'] ?? 1)
            ->withQueryString();

        return Inertia::render('organization/index', [
            'organizations' => $organizations->through(function ($organization) {
                return (new OrganizationResource($organization))->toArray(request());
            })->values()->all(),
            'pagination' => [
                'current_page' => $organizations->currentPage(),
                'last_page' => $organizations->lastPage(),
                'per_page' => $organizations->perPage(),
                'total' => $organizations->total(),
            ],
        ]);
    }

    /**
     * Show the organization edit form.
     */
    public function edit(Organization $organization): Response
    {
        return Inertia::render('organization/edit', [
            'organization' => (new OrganizationResource($organization))->toArray(request()),
        ]);
    }

    /**
     * Update the organization.
     */
    public function update(Organization $organization, OrganizationUpdateRequest $request): RedirectResponse
    {
        $input = $request->validated();

        $organization->update([
            'name' => $input['name'],
            'description' => $input['description'] ?? null,
            'email' => $input['email'] ?? null,
            'phone' => $input['phone'] ?? null,
            'website' => $input['website'] ?? null,
            'city' => $input['city'] ?? null,
            'state' => $input['state'] ?? null,
            'country' => $input['country'] ?? null,
            'employee_count' => $input['employee_count'] ?? null,
            'founded_date' => $input['founded_date'] ?? null,
            'is_active' => $input['is_active'],
        ]);

        return Redirect::route('organizations.index');
    }

    /**
     * Destroy the organization.
     */
    public function destroy(Organization $organization): RedirectResponse
    {
        $organization->delete();

        return to_route('organizations.index');
    }
}
