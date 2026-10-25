<?php

namespace App\Http\Requests;

use App\Helpers\ContactPhone;
use App\Models\ContactInquiry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreContactInquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'request_type' => ['required', 'string', Rule::in(array_keys(ContactInquiry::leadTypes()))],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'consent' => ['accepted'],
            'phone' => ['required', 'string', 'max:40', new ContactPhone],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'request_type.required' => __('pages.contact_type_required'),
            'request_type.in' => __('pages.contact_type_required'),
            'first_name.required' => __('pages.contact_first_name_required'),
            'last_name.required' => __('pages.contact_last_name_required'),
            'phone.required' => __('pages.contact_phone_required'),
            'email.required' => __('pages.contact_email_required'),
            'email.email' => __('pages.contact_email_invalid'),
            'message.required' => __('pages.contact_message_required'),
            'message.max' => __('pages.contact_message_max'),
            'consent.accepted' => __('pages.contact_consent_required'),
        ];
    }
}
