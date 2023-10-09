<?php

namespace Vincere\Heatstroke;

use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class HeatstrokeServiceProvider extends ServiceProvider implements DeferrableProvider
{
    public function register()
    {
    }

    public function boot()
    {
        if (!$this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            Console\InstallCommand::class,
        ]);
    }

    public function provides()
    {
        return [Console\InstallCommand::class];
    }
}
