<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminWithApprovedAction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\JsonResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        if ($user &&($user->role === 'superAdmin' || $user->role === 'admin') && $user->is_approved)
        {
            return $next($request);
        }
        else{
            return response()->json([
                'error' => 'Unauthorized'
            ], 403);
        }
    }
}
