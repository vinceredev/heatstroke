<?php

namespace App\Jobs\Role;

use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Spatie\Permission\Models\Role;

class CreateRole implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(protected string $id)
    {}

    public function handle(Request $request): void
    {
        $name = strtolower($request->name);
        $exists = Role::where('name', '=', $name)->first();

        if ($exists) {
            throw new Exception('Role with this name is already exists.');
        }

        Role::insert([
            'id' => $this->id,
            'name' => $name,
            'guard_name' => 'web',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
