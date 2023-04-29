<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\DB;

class UniqueDomain implements Rule
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
        $result = DB::table('users')
            ->whereRaw('SUBSTRING_INDEX(email, "@", -1) = ?', $domain)
            ->count();
        return $result ? false : true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
//        return 'The validation error message.';
        return 'The domain must be unique.';
    }
}
