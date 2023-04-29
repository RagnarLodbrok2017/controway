<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class BlockGmailDomain implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $domain = strtolower(explode('@', $value)[1]);
        return str_contains($value, 'gmail') ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
//        return 'The validation error message.';
        return 'The :attribute domain (gmail) is not allowed.';
    }
}
