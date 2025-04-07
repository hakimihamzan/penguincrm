# [Penguin CRM](https://penguincrm.ofenvw.xyz/)

A demo application to illustrate how [Inertia.js](https://inertiajs.com/) works with [Laravel](https://laravel.com/), [React](https://reactjs.org/) and [Shadcn](https://ui.shadcn.com/).


![](https://raw.githubusercontent.com/hakimihamzan/penguincrm/refs/heads/main/screenshot.png)


## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 19 with TypeScript + Shadcn
- **Styling**: Tailwind CSS
- **SPA Functionality**: InertiaJS
- **Authentication**: Laravel Sanctum

## Prerequisites

- PHP 8.2+
- Node.js 22+
- Composer v2
- MySQL/PostgreSQL/SQLite
  

## Installation

Clone the repo locally:

```sh
git clone https://github.com/hakimihamzan/penguincrm.git
cd penguincrm
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm install
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Create an SQLite database. You can also use another database (MySQL, Postgres), simply update your configuration accordingly.

```sh
touch database/database.sqlite
```

Run database migrations:

```sh
php artisan migrate
```

Run database seeder:

```sh
php artisan db:seed
```

Run dev server:

```sh
composer dev
```

You're ready to go! [Visit Penguin CRM](http://127.0.0.1:8000/) in your browser, and login with:

- **Username:** test@email.com
- **Password:** password

## License

This project is licensed under the MIT License.

## Contribution

Feel free to contribute! Just fork the repo, make your changes, and submit a pull request. If you have any questions or run into issues, don't hesitate to reach out.


## Support My Work

[Buy Me A Coffee](https://buymeacoffee.com/hakimihamzan). You can reach me at [x.com](https://x.com/HakimiHamzan) or through my email: hakimihamzan20@gmail.com

