<?php

namespace App\Http\Requests;

use App\Rules\BlockGmailDomain;
use App\Rules\UniqueDomain;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                'required','max:50', 'min:3','string'
            ],
            'email' => [
                'required',
                'email',
                'max:100',
                'min:5',
                Rule::unique('users','email')->ignore($this->id),
                new BlockGmailDomain,
                new UniqueDomain,
            ],
            'password' => [
                'required',
                'min:8',
                'max:20',
                'regex:/[A-Z]/',
                'regex:/[a-z]/',
                'regex:/[0-9]/',
                'regex:/[&*?%$#@!]/',
                'confirmed'
            ],
            'role' => [
                'nullable',
            ],
            'is_approved' => [
                'nullable',
            ],
        ];
    }
    public function messages()
    {
        return [
            'password.required' => 'Please enter a password.',
            'password.min' => 'The password must be at least 8 characters.',
            'password.max' => 'The password may not be greater than 20 characters.',
            'password.regex' => 'The password must contain at least one uppercase letter,
             one lowercase letter, one number, and one special character (such as & * ? % $ # @ , or !).'
        ];
    }
}
