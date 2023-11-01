import uuid

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from apps.core.models import TimestampableMixin
from apps.core.models import DeletedMixin


class Product(TimestampableMixin, DeletedMixin):
    product_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    code = models.CharField(max_length=10, unique=True)
    description = models.CharField(max_length=100, unique=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    commission_percentage = models.DecimalField(
        max_digits=4, decimal_places=2,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(10)
        ])

    class Meta:
        db_table = 'product'
        ordering = ['code']
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return f'{self.code}, {self.description}'
