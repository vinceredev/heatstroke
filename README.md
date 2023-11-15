## Heatstroke
A minimal Laravel starter-kit, heavily inspired by [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) with additional commonly used package to help you start faster when building ERP, CRM, or Internal Dashboard. Built with React.js, Inertia.js, Ant Design.

Packages included in heatstroke:
* React.js
* Inertia.js
* Ant Design
* TailwindCSS
* Laravel Sanctum
* Intervention Image
* Laravel Permission
* Ziggy

### Installation
This package needs to be the first one you install after setting up a brand-new Laravel project. Before installing Heatstroke, make sure to run Laravel's database migration and you've committed all the previous changes. To install Heatstroke, use the following command:

```bash
$ composer require vincere/heatstroke
```
Next, you'll have to install the scaffolding and run the database migration. To achieve this, please execute the following command:
```bash
$ php artisan heatstroke:install
$ php artisan migrate --seed
```

Once everything is set up, run the app, and you can then open your browser to see the application in action.

## License
Heatstroke is licensed under [MIT](./LICENSE)
