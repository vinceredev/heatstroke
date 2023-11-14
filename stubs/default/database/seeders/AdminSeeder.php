<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $root = User::factory()->create([
            'name' => 'Administrator',
            'email' => 'root@vinceredigital.com',
            'password' => Hash::make('root'),
            'email_verified_at' => now(),
            'is_internal_staff' => true,
        ]);

        $root->assignRole('super admin');
    }
}
