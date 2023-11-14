<?php

namespace App\Jobs\Staff;

use App\Http\Requests\Staff\StaffInvitationRequest;
use App\Mail\InvitationMail;
use App\Models\User;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class InviteStaff implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {}

    public function handle(StaffInvitationRequest $request): void
    {
        $exists = User::where('email', $request->email)->first();

        if ($exists) {
            if ($exists->id === $request->user()->id) {
                throw new Exception("Can not invite yourself.");
            } else {
                throw new Exception("User is already invited.");
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make(Str::ulid()->toRfc4122()),
            'invitation_token' => Str::ulid()->toRfc4122(),
            'is_internal_staff' => true,
            'status' => 'inactive',
        ]);

        $user->syncRoles([$request->role]);

        $mail_content = [
            'app' => config('app.name'),
            'url' => config('app.url') . '/invitation/' . $user->invitation_token,
            'inviter' => $request->user()->name,
        ];

        Mail::to($user->email)->send(new InvitationMail($mail_content));
    }
}
