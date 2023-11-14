## Heatstroke
A minimal Laravel starter-kit, heavily inspired by [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) with additional commonly used package to help you start faster when building ERP, CRM, or Internal Dashboard.  
Built with React.js, Inertia.js, Ant Design, and Laravel Permission.


### Installation
This package should be installed first after you set a freshly new Laravel project. You also need to run Laravel's database migration before installing Heatstroke. To install `heatstroke` run:

```bash
$ composer require vincere/heatstroke
```
Then, you need to install the scaffolding and also run the database migration, to do so please run:
```bash
$ php artisan heatstroke:install
$ php artisan migrate --seed
```

Once everything is set, now you can navigate to browser to see the application.

## License
Heatstroke is licensed under [MIT](./LICENSE)
