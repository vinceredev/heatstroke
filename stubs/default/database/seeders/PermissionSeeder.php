<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $arrayOfPermissionNames = [
            'view dashboard',
            'edit dashboard',

            'view profile',
            'edit profile',
            'edit password profile',
            'delete profile',

            // Staff Permissions
            'view staff',
            'add staff',
            'edit staff',
            'edit other staff',
            'view detail staff',
            'view detail other staff',
            'delete staff',

            // Role Permissions
            'view role',
            'add role',
            'edit role',
            'view detail role',
            'delete role',
        ];
        $permissions = collect($arrayOfPermissionNames)->map(function ($permission) {
            return ['name' => $permission, 'guard_name' => 'web'];
        });

        Permission::insert($permissions->toArray());

        // Give full access to super admin
        $root = Role::where('name', 'super admin')->first();
        $root->givePermissionTo(Permission::all());
    }
}
