<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    /** @use HasFactory<\Database\Factories\OrganizationFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'logo',
        'email',
        'phone',
        'website',
        'city',
        'state',
        'country',
        'employee_count',
        'founded_date',
        'is_active',
    ];
}
