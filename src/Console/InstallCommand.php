<?php

namespace Vincere\Heatstroke\Console;

use Illuminate\Console\Command;
use Illuminate\Contracts\Console\PromptsForMissingInput;
use RuntimeException;
use Symfony\Component\Process\Process;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

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
        if (!$this->requireComposerPackages(['inertiajs/inertia-laravel:^0.6.3', 'laravel/sanctum:^3.2', "intervention/image:^2.7", "spatie/laravel-permission:^6.0", 'tightenco/ziggy:^1.0'])) {
            return 1;
        }

        $this->updateNodePackages(function ($packages) {
            return [
                '@ant-design/icons' => '^5.2.6',
                '@inertiajs/react' => '^1.0.0',
                '@tailwindcss/forms' => '^0.5.3',
                '@vitejs/plugin-react' => '^4.0.3',
                'antd' => '^5.10.2',
                'autoprefixer' => '^10.4.12',
                'axios' => '^1.1.2',
                'date-fns' => '^2.30.0',
                'laravel-vite-plugin' => '^0.8.0',
                'less' => '^4.1.3',
                'lodash' => '^4.17.21',
                'postcss' => '^8.4.18',
                'react' => '^18.2.0',
                'react-dom' => '^18.2.0',
                'tailwindcss' => '^3.2.1',
                'vite' => '^4.0.0'
            ] + $packages;
        });

        // Controllers...
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Controllers'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/default/app/Http/Controllers', app_path('Http/Controllers'));

        // Requests...
        (new Filesystem)->ensureDirectoryExists(app_path('Http/Requests'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/default/app/Http/Requests', app_path('Http/Requests'));

        $this->installMiddlewareAfter('SubstituteBindings::class', '\App\Http\Middleware\HandleInertiaRequests::class');
        $this->installMiddlewareAfter('\App\Http\Middleware\HandleInertiaRequests::class', '\Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class');

        copy(__DIR__ . '/../../stubs/default/app/Http/Middleware/HandleInertiaRequests.php', app_path('Http/Middleware/HandleInertiaRequests.php'));

        // Jobs...
        (new Filesystem)->ensureDirectoryExists(app_path('Jobs'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/default/app/Jobs', app_path('Jobs'));

        // Lang...
        copy(__DIR__ . '/../../stubs/default/app/Lang/lang.php', app_path('Lang/lang.php'));
        copy(__DIR__ . '/../../stubs/default/lang/en.json', base_path('lang/en.json'));

        // Mail
        copy(__DIR__ . '/../../stubs/default/app/Mail/InvitationMail.php', app_path('Mail/InvitationMail.php'));
        copy(__DIR__ . '/../../stubs/default/resources/views/emails/InvitationMail.blade.php', base_path('resources/views/emails/InvitationMail.blade.php'));


        // Models...
        copy(__DIR__ . '/../../stubs/default/app/Models/User.php', app_path('Models/User.php'));

        // Queries...
        (new Filesystem)->ensureDirectoryExists(app_path('Queries'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/default/app/Queries', app_path('Queries'));

        // Utilities...
        (new Filesystem)->ensureDirectoryExists(app_path('Utilities'));
        (new Filesystem)->copyDirectory(__DIR__ . '/../../stubs/default/app/Utilities', app_path('Utilities'));

        // Configs
        copy(__DIR__ . '/../../stubs/default/config/image.php', base_path('config/image.php'));
        copy(__DIR__ . '/../../stubs/default/config/permission.php', base_path('config/permission.php'));
        copy(__DIR__ . '/../../stubs/default/config/sanctum.php', base_path('config/sanctum.php'));

        // Views...
        copy(__DIR__ . '/../../stubs/react-antd/resources/views/app.blade.php', resource_path('views/app.blade.php'));

        // Routes...
        copy(__DIR__ . '/../../stubs/default/routes/web.php', base_path('routes/web.php'));
        copy(__DIR__ . '/../../stubs/default/routes/auth.php', base_path('routes/auth.php'));

        // Migrations & Seeders...
        copy(__DIR__ . '/../../stubs/default/database/migrations/2023_10_25_000000_create_permission_tables.php', base_path('database/migrations/2023_10_25_000000_create_permission_tables.php'));
        copy(__DIR__ . '/../../stubs/default/database/migrations/2023_10_31_000000_update_users_table.php', base_path('database/migrations/2023_10_31_000000_update_users_table.php'));

        copy(__DIR__ . '/../../stubs/default/database/seeders/AdminSeeder.php', base_path('database/seeders/AdminSeeder.php'));
        copy(__DIR__ . '/../../stubs/default/database/seeders/DatabaseSeeder.php', base_path('database/seeders/DatabaseSeeder.php'));
        copy(__DIR__ . '/../../stubs/default/database/seeders/PermissionSeeder.php', base_path('database/seeders/PermissionSeeder.php'));
        copy(__DIR__ . '/../../stubs/default/database/seeders/RoleSeeder.php', base_path('database/seeders/RoleSeeder.php'));

        // Assets
        copy(__DIR__ . '/../../stubs/default/public/images/vincere_logo.png', base_path('public/images/vincere_logo.png'));

        // Tailwind / Vite...
        copy(__DIR__ . '/../../stubs/react-antd/resources/css/app.less', resource_path('css/app.less'));
        copy(__DIR__ . '/../../stubs/default/postcss.config.js', base_path('postcss.config.js'));
        copy(__DIR__ . '/../../stubs/default/tailwind.config.js', base_path('tailwind.config.js'));
        copy(__DIR__ . '/../../stubs/default/vite.config.js', base_path('vite.config.js'));

        // SSR
        copy(__DIR__ . '/../../stubs/react-antd/resources/js/ssr.jsx', resource_path('js/ssr.jsx'));

        $this->replaceInFile('vite build', 'vite build && vite build --ssr', base_path('package.json'));
        $this->replaceInFile('/node_modules', '/bootstrap/ssr' . PHP_EOL . '/node_modules', base_path('.gitignore'));

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

    protected function installMiddlewareAfter($after, $name, $group = 'web')
    {
        $httpKernel = file_get_contents(app_path('Http/Kernel.php'));

        $middlewareGroups = Str::before(Str::after($httpKernel, '$middlewareGroups = ['), '];');
        $middlewareGroup = Str::before(Str::after($middlewareGroups, "'$group' => ["), '],');

        if (!Str::contains($middlewareGroup, $name)) {
            $modifiedMiddlewareGroup = str_replace(
                $after . ',',
                $after . ',' . PHP_EOL . '            ' . $name . ',',
                $middlewareGroup,
            );

            file_put_contents(app_path('Http/Kernel.php'), str_replace(
                $middlewareGroups,
                str_replace($middlewareGroup, $modifiedMiddlewareGroup, $middlewareGroups),
                $httpKernel
            ));
        }
    }

    protected function hasComposerPackage($package)
    {
        $packages = json_decode(file_get_contents(base_path('composer.json')), true);

        return array_key_exists($package, $packages['require'] ?? [])
            || array_key_exists($package, $packages['require-dev'] ?? []);
    }

    protected function removeComposerPackages(array $packages, $asDev = false)
    {
        $composer = $this->option('composer');

        if ($composer !== 'global') {
            $command = ['php', $composer, 'remove'];
        }

        $command = array_merge(
            $command ?? ['composer', 'remove'],
            $packages,
            $asDev ? ['--dev'] : [],
        );

        return (new Process($command, base_path(), ['COMPOSER_MEMORY_LIMIT' => '-1']))
            ->setTimeout(null)
            ->run(function ($type, $output) {
                $this->output->write($output);
            }) === 0;
    }

    protected static function flushNodeModules()
    {
        tap(new Filesystem, function ($files) {
            $files->deleteDirectory(base_path('node_modules'));

            $files->delete(base_path('yarn.lock'));
            $files->delete(base_path('package-lock.json'));
        });
    }

    protected function replaceInFile($search, $replace, $path)
    {
        file_put_contents($path, str_replace($search, $replace, file_get_contents($path)));
    }
}
