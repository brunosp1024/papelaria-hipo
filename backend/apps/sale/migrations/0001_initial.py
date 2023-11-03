# Generated by Django 4.2.7 on 2023-11-03 20:18

import apps.core.utils.functions_utils
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('product', '0001_initial'),
        ('seller', '0001_initial'),
        ('customer', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True, verbose_name='Deleted at')),
                ('sale_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('invoice', models.CharField(default=apps.core.utils.functions_utils.generate_random_code, editable=False, max_length=100, unique=True)),
                ('date', models.DateTimeField()),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('commission_total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customer.customer')),
                ('seller', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='seller.seller')),
            ],
            options={
                'verbose_name': 'sale',
                'verbose_name_plural': 'sales',
                'db_table': 'sale',
                'ordering': ['-date'],
            },
        ),
        migrations.CreateModel(
            name='SaleItem',
            fields=[
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True, verbose_name='Deleted at')),
                ('sale_item_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('quantity', models.PositiveIntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product')),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sale_items', to='sale.sale')),
            ],
            options={
                'verbose_name': 'Sale item',
                'verbose_name_plural': 'Sale items',
                'db_table': 'sale_item',
                'ordering': ['product__description'],
            },
        ),
    ]