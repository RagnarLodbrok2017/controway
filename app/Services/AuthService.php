<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthService
{
    public function login(LoginRequest $request)
    {
        if ($request)
        {
            if( Auth::attempt($request->only(['email', 'password'])) ){
                $user = User::where('email', $request->email)->first();
                $token = $user->createToken('Admin')->plainTextToken;
                Session::put('token', $token);
                return $user;
            }
        }
    }
    public function register(RegisterRequest $request)
    {
        if ($request)
        {
            try {
                return User::create([
                    'name' => $request['name'],
                    'email' => $request['email'],
                    'password' => Hash::make($request['password']),
                    'is_approved' => 0,
                    'role' => 'admin',
                ]);
            }
            catch (Exception $ex){
                return $ex->getMessage();
            }
        }
    }


}
