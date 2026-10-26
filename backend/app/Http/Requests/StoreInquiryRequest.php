<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInquiryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'phone' => ['required', 'string', 'min:7', 'max:30', 'regex:/^\+?[0-9][0-9\s().-]{5,28}$/'],
            'interest' => ['required', 'string', Rule::in([
                'Websites',
                'Landing pages',
                'CRM',
                'ERP',
                'Advanced dashboards',
                'SEO / GEO',
                'AI / Automation',
                'LMS',
                'CMS',
                'Mobile apps',
                'Not sure',
            ])],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'website' => ['nullable', 'string', 'max:200'],
        ];
    }
}
