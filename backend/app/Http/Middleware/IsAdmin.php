<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Closure|RedirectResponse|Response
    {
        if (! $request->user()->isAdmin()) {
            return redirect()->route('home');
        }
        return $next($request);
    }
}