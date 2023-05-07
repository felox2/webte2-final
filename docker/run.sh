#!/bin/sh

php artisan migrate --force
php artisan db:seed --force -q

/usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf