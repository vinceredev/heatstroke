<?php

namespace Vincere\Heatstroke\Console;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use RuntimeException;
use Symfony\Component\Process\Process;

class InstallCommand extends Command implements PromptsForMissingInput
{
    protected $signature = 'heatstroke:install';

    protected $description = 'Install the Heatstroke controllers and resources';

    public function handle()
    {
        $this->installHeatstrokeStack();
    }

    protected function requireComposerPackages(array $packages, $asDev = false)
    {
        $command = array_merge(
            $command ?? ['composer', 'require'],
            $packages,
            $asDev ? ['--dev'] : [],
        );

        return (new Process($command, base_path(), ['COMPOSER_MEMORY_LIMIT' => '-1']))
        ->setTimeout(null)
            ->run(function ($type, $output) {
                $this->output->write($output);
            }) === 0;
    }

    protected static function updateNodePackages(callable $callback, $dev = true)
    {
        if (!file_exists(base_path('package.json'))) {
            return;
        }

        $configurationKey = $dev ? 'devDependencies' : 'dependencies';

        $packages = json_decode(file_get_contents(base_path('package.json')), true);

        $packages[$configurationKey] = $callback(
            array_key_exists($configurationKey, $packages) ? $packages[$configurationKey] : [],
            $configurationKey
        );

        ksort($packages[$configurationKey]);

        file_put_contents(
            base_path('package.json'),
            json_encode($packages, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . PHP_EOL
        );
    }

    protected function runCommands($commands)
    {
        $process = Process::fromShellCommandline(implode(' && ', $commands), null, null, null, null);

        if ('\\' !== DIRECTORY_SEPARATOR && file_exists('/dev/tty') && is_readable('/dev/tty')) {
            try {
                $process->setTty(true);
            } catch (RuntimeException $e) {
                $this->output->writeln('  <bg=yellow;fg=black> WARN </> ' . $e->getMessage() . PHP_EOL);
            }
        }

        $process->run(function ($type, $line) {
            $this->output->write('    ' . $line);
        });
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
