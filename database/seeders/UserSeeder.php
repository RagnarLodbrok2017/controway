<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'Ahmed Elnakieb';
        $user->email = 'ahmed@elnakieb.com';
        $user->password = Hash::make('000');
        $user->role = 'superAdmin';
        $user->is_approved = 1;
        $user->save();
    }
}
