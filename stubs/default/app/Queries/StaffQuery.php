<?php

namespace App\Queries;

use App\Models\User;

final class StaffQuery
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

        $query = User::Query()->with(['roles'])
            ->where('is_internal_staff', true)
            ->where(function ($query) use ($request) {
                if ($request->search) {
                    $keyword = '%' . $request->search . '%';
                    $query->where('name', 'like', $keyword)
                        ->orWhere('email', 'like', $keyword);
                }

                $query->when($request->status, function ($query) use ($request) {
                    $query->where('status', $request->status);
                });

                $query->when($request->role, function ($query) use ($request) {
                    $query->whereHas('roles', function ($query) use ($request) {
                        $query->where('id', $request->role);
                    });
                });
            });

        if ($request->has(['field', 'direction'])) {
            $query->orderBy($request->field, $request->direction);
        } else {
            $query->latest();
        }

        return $query->paginate($request->load ? $request->load : 10);
    }
}
