<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arrayOfRoleNames = ['super admin', 'staff', 'unassigned'];

        $roles = collect($arrayOfRoleNames)->map(function ($role) {
            return ['name' => $role, 'guard_name' => 'web', 'created_at' => now(), 'updated_at' => now()];
        });

        Role::insert($roles->toArray());
    }
}
