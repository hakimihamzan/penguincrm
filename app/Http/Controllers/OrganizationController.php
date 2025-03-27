<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationController extends Controller
{
    /**
     * Show the organizations list.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('organization', [
        ]);
    }
}
