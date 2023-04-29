<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    private $authService;
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
        $this->middleware('guest')->except('logout');
        $this->middleware(['auth:sanctum'])->except(['loginView','login', 'registerView','register']);
    }

    public function loginView(){
        return view('home.auth.login');
    }

    public function login(LoginRequest $request){
        $user = $this->authService->login($request);
        if ($user && $user->is_approved) {
            return redirect('./dashboard');
        } else {
//            $request->session()->put('approved', 'Please wait Super Admin to Approved Your request');
            Session::put('approved', 'Please wait Super Admin to Approved Your request');
            return redirect()->route('user.home')->with('message', 'Please wait Super Admin to Approved Your request');
//            return redirect('./home');
        }
    }

    public function registerView(){
        return view('home.auth.register');
    }

    public function register(RegisterRequest $request){
        $this->authService->register($request);
        $user = new LoginRequest([
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);
        return $this->login($user);
    }

    public function logout(Request $request)
    {
        auth()->guard('web')->logout();
        Session::flush();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
