<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Show the users list.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('user', [
        ]);
    }
}
