<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'logo' => $this->logo,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'city' => $this->city,
            'state' => $this->state,
            'country' => $this->country,
            'employee_count' => $this->employee_count,
            'founded_date' => $this->founded_date,
            'is_active' => $this->is_active,
        ];
    }
}
