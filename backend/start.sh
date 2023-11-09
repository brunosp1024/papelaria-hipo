#!/bin/bash

python manage.py migrate

if [ $? -eq 0 ]; then
    python manage.py loaddata products.json
    python manage.py loaddata sellers.json
    python manage.py loaddata customers.json
    python manage.py loaddata sales.json
    python manage.py loaddata sale_items.json
    python manage.py loaddata commission_setups.json
fi

exec "$@"
