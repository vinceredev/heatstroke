<?php

namespace Vincere\Heatstroke\Console;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;

class InstallCommand extends Command implements PromptsForMissingInput
{
    protected $signature = 'heatstroke:install';

    protected $description = 'Install the Heatstroke controllers and resources';

    public function handle()
    {
        $this->installHeatstrokeStack();
    }

    public function installHeatstrokeStack()
    {
        if (!$this->requireComposerPackages(['inertiajs/inertia-laravel:^0.6.3', 'laravel/sanctum:^3.2', 'tightenco/ziggy:^1.0'])) {
            return 1;
        }

        $this->updateNodePackages(function ($packages) {
            return [
                '@inertiajs/react' => '^1.0.0',
                '@vitejs/plugin-react' => '^4.0.3',
                'antd' => '^5.6.1',
                'axios' => '^1.1.2',
                'clsx' => '^1.2.1',
                'date-fns' => '^2.30.0',
                'dayjs' => '^1.11.8',
                'less' => '^4.1.3',
                'lodash' => '^4.17.21',
                'react' => '^18.2.0',
                'react-dom' => '^18.2.0',
            ] + $packages;
        });

        $this->components->info('Installing and building Node dependencies.');

        if (file_exists(base_path('bun.lockb'))) {
            $this->runCommands(['bun install', 'bun run build']);
        } elseif (file_exists(base_path('pnpm-lock.yaml'))) {
            $this->runCommands(['pnpm install', 'pnpm run build']);
        } elseif (file_exists(base_path('yarn.lock'))) {
            $this->runCommands(['yarn install', 'yarn run build']);
        } else {
            $this->runCommands(['npm install', 'npm run build']);
        }

        $this->line('');
        $this->components->info('Heatstroke scaffolding installed successfully.');
    }
}
