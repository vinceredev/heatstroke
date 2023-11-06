<?php

namespace App\Http\Controllers;

use App\Jobs\Staff\DeleteStaff;
use App\Jobs\Staff\InviteStaff;
use App\Jobs\Staff\UpdateStaff;
use App\Models\User;
use App\Queries\StaffQuery;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Staff/Index', [
            'staffs' => StaffQuery::search($request),
            'roles' => Role::all(),
        ]);
    }

    public function store()
    {
        $this->dispatchSync(new InviteStaff());

        return back()->with('success', __('Email invitation has been sent.'));
    }

    public function edit($id)
    {
        $staff = User::with('roles')->findOrFail($id);

        return inertia('Staff/Edit', [
            'staff' => $staff,
            'roles' => Role::all(),
        ]);
    }

    public function update($id)
    {
        $user = User::findOrFail($id);

        $this->dispatchSync(new UpdateStaff($user));

        return back()->with('success', __('Staff has been updated successfully.'));
    }

    public function destroy()
    {
        $this->dispatchSync(new DeleteStaff());

        return back()->with('success', __('Staff has been deleted successfully.'));
    }
}
