import uuid

from django.db import models

from apps.core.models import DeletedMixin
from apps.product.models import Product


class SaleItem(DeletedMixin):
    sale_item_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sale = models.ForeignKey(
        'Sale', on_delete=models.CASCADE,
        null=False, blank=False, related_name='sale_items'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    quantity = models.PositiveIntegerField()
    day_commission_percentage = models.DecimalField(max_digits=4, decimal_places=2, null=True)

    class Meta:
        db_table = 'sale_item'
        ordering = ['product__description']
        verbose_name = 'Sale item'
        verbose_name_plural = 'Sale items'

    def __str__(self):
        return f'{self.sale}, {self.product}'

    @property
    def item_total(self):
        return self.product.unit_price * self.quantity

    @property
    def commission_total(self):
        if self.day_commission_percentage:
            commission = self.day_commission_percentage
        else:
            commission = self.product.commission_percentage

        return self.item_total * commission/100
