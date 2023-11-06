<?php

namespace App\Jobs\Staff;

use App\Http\Requests\Staff\StaffUpdateRequest;
use App\Models\User;
use App\Utils\Uploader;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UpdateStaff implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public User $user)
    {}

    public function handle(StaffUpdateRequest $request): void
    {
        $user = $this->user;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->status = $request->status;

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }

        if ($user->avatar) {
            if ($request->avatar !== $user->avatar) {
                $filename = '/avatar/' . $request->id;
                $files = Uploader::processImages($filename, $request->avatar, config('image.sizes'));
                $avatar = $files['original'];
            }
        } else {
            $avatar = null;
            if ($user->avatar) {
                Uploader::removeImages($user->avatar, config('image.sizes'));
            }
        }

        $user->avatar = $avatar;
        $user->save();

        $user->syncRoles([$request->role]);
    }
}
