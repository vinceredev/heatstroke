<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class InvitationController extends Controller
{
    public function edit(string $token)
    {
        $user = User::where('invitation_token', $token)->where('status', 'inactive')->firstOrFail();

        return inertia('SetPassword/Index', ['user' => $user]);
    }

    public function update(Request $request)
    {
        $user = User::where('invitation_token', $request->token)->where('status', 'inactive')->firstOrFail();
        $user->update([
            'password' => Hash::make($request->password),
            'invitation_token' => null,
            'email_verified_at' => now(),
            'status' => 'active',
        ]);

        Auth::loginUsingId($user->id);

        return redirect()->route('dashboard')->with('success', __('Password has been set successfully.'));
    }
}
