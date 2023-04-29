<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
                'required','max:191','min:1',
                Rule::unique('products','name')->ignore($this->id),
            ],
            'type' => [
                'nullable','max:191',
            ],
            'quantity' => [
                'nullable','integer','digits_between:0,10',
            ],
        ];
    }
}
