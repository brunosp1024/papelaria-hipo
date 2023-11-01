# Generated by Django 4.2.7 on 2023-11-01 18:26

import django.core.validators
from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('deleted_at', models.DateTimeField(blank=True, default=None, null=True, verbose_name='Deleted at')),
                ('product_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('code', models.CharField(max_length=10, unique=True)),
                ('description', models.CharField(max_length=100, unique=True)),
                ('unit_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('commission_percentage', models.DecimalField(decimal_places=2, max_digits=4, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)])),
            ],
            options={
                'verbose_name': 'product',
                'verbose_name_plural': 'products',
                'db_table': 'product',
                'ordering': ['code'],
            },
        ),
    ]