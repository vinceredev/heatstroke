<?php

namespace App\Http\Controllers;

use App\Jobs\Role\CreateRole;
use App\Jobs\Role\DeleteRole;
use App\Jobs\Role\UpdateRole;
use App\Queries\RoleQuery;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $roles = RoleQuery::search($request);

        return inertia('Role/Index', ['roles' => $roles]);
    }

    public function store()
    {
        $last_record = Role::orderBy('id', 'desc')->first();
        $next_id = $last_record->id + 1;

        $this->dispatchSync(new CreateRole($next_id));

        return redirect()->route('role.edit', ['id' => $next_id])->with('success', __('New role has been created.'));
    }

    public function edit($id)
    {
        $role = Role::with(['permissions'])->where('id', $id)->firstOrFail();

        $permissions = Permission::get()->reduce(function ($carry, $permission) {
            $name = explode(' ', $permission->name);
            $group = end($name);

            if (array_key_exists($group, $carry)) {
                array_push($carry[$group], $permission);
            } else {
                $carry[$group] = [$permission];
            }
            return $carry;
        }, []);


        return inertia('Role/Edit', ['role' => $role, 'permissions' => $permissions]);
    }

    public function update()
    {
        $this->dispatchSync(new UpdateRole());

        return redirect()->back()->with('success', __('The role has been updated.'));
    }

    public function delete()
    {
        $this->dispatchSync(new DeleteRole());

        return back()->with('success', __('The role has been deleted successfully.'));
    }
}
