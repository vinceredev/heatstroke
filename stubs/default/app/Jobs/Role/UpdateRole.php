<?php

namespace App\Jobs\Role;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\Permission\Models\Role;

class UpdateRole implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {}

    public function handle(Request $request): void
    {
        $role = Role::findById($request->id);
        $role->name = $request->name;
        $role->save();

        $role->syncPermissions($request->permissions);
    }
}
