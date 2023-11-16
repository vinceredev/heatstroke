<?php

namespace App\Http\Controllers;

use App\Queries\LogQuery;
use Illuminate\Http\Request;

class LogActivityController extends Controller
{
    public function index(Request $request)
    {
        $logs = LogQuery::search($request);

        return inertia('ActivityLog/Index', [
            'activities' => $logs
        ]);
    }
}
