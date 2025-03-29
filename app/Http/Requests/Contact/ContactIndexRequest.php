<?php

namespace App\Http\Requests\Contact;

use App\Models\Contact;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ContactIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:255'],
            'status' => ['nullable', 'string', Rule::in(Contact::STATUSES)],
            'sort_by' => ['nullable', 'string', Rule::in(['name', 'email', 'phone', 'status'])],
            'sort_order' => ['nullable', 'string', Rule::in(['asc', 'desc'])],
            'per_page' => ['nullable', 'integer', 'min:1'],
            'page' => ['nullable', 'integer', 'min:1'],
        ];
    }
}
