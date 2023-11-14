<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $permissions = [];
        $auth = $request->user();

        if ($auth) {
            $permissions = Permission::all()
                ->pluck('name')
                ->reduce(function ($carry, $name) use ($auth) {
                    $carry[Str::snake($name, '_')] = $auth->can($name);
                    return $carry;
                }, []);
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $auth,
                'permissions' => $permissions,
            ],
            'flash' => fn () => [
                'success' => session('success'),
                'warning' => session('warning'),
                'error' => session('error'),
                'status' => session('status'),
            ],
            'language' => fn () => translations(base_path('lang/' . app()->getLocale() . '.json')),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
