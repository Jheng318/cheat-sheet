<?php

namespace App\Http\Middleware;

use App\Models\Token;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isTokenValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        $isValidToken = User::where('remember_token', $token)->first();
        if(!$isValidToken){
            return response()->json(['error_message' => 'Invalid Token'], 401);
        }
        return $next($request);
    }
}