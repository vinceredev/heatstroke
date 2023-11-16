## Heatstroke
A minimal Laravel starter-kit, heavily inspired by [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) with additional commonly used package to help you start faster when building ERP, CRM, or Internal Dashboard. Built with React.js, Inertia.js, Ant Design.

Here are packages included in heatstroke in alphabetical order:
* Ant Design
* Inertia.js
* Intervention Image
* Laravel ActivityLog
* Laravel Permission
* Laravel Sanctum
* React.js
* TailwindCSS
* Ziggy

### Installation
This package needs to be the first one you install after setting up a brand-new Laravel project. Before installing Heatstroke, make sure you've committed all the previous changes. To install Heatstroke, use the following command:

```bash
$ composer require vincere/heatstroke
```
Next, you'll have to install the scaffolding, run the database migration and seeder. To achieve this, please execute the following command:
```bash
$ php artisan heatstroke:install
$ php artisan migrate --seed
```

Once everything is set up, run the app, and you can then open your browser to see the application in action.

## License
Heatstroke is licensed under [MIT](./LICENSE)
