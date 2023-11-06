<?php

namespace App\Queries;

use Spatie\Permission\Models\Role;

final class RoleQuery
{
    public static function search($request)
    {
        $request->validate([
            'direction' => ['in:asc,desc'],
            'field' => ['in:id,first_name,last_name,email,username'],
            'search' => ['nullable', 'string'],
            'role' => ['nullable', 'numeric'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $query = Role::Query()
            ->withCount('users')
            ->where(function ($query) use ($request) {
                if ($request->search) {
                    $keyword = '%' . $request->search . '%';
                    $query->where('name', 'like', $keyword);
                }
            });

        if ($request->has(['field', 'direction'])) {
            $query->orderBy($request->field, $request->direction);
        } else {
            $query->latest();
        }

        return $query->paginate($request->load ? $request->load : 10);
    }
}
