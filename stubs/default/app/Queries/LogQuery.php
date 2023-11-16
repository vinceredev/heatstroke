<?php

namespace App\Queries;

use Spatie\Activitylog\Models\Activity;

final class LogQuery
{
    public static function search($request)
    {
        $request->validate([
            'direction' => ['in:asc,desc'],
            'field' => ['in:id,title,content,created_at'],
            'search' => ['nullable', 'string'],
            'status' => ['nullable', 'in:published,draft'],
        ]);

        $query = Activity::Query()->with(['causer']);

        if ($request->has(['field', 'direction'])) {
            $query->orderBy($request->field, $request->direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $query->where(function ($query) use ($request) {
            if ($request->event) {
                $query->forEvent($request->event);
            }

            if ($request->search) {
                $query->whereHas('causer', function ($q) use ($request) {
                    $q->where('email', 'LIKE', '%' . $request->search . '%');
                })
                    ->orWhere('subject_type', 'LIKE', '%' . $request->search . '%');
            }
        });

        return $query->paginate($request->load ? $request->load : 10);
    }
}
