import uuid

from django.db import models

from apps.core.models import DeletedMixin
from apps.core.utils.functions_utils import generate_random_code
from apps.customer.models import Customer
from apps.seller.models import Seller


class Sale(DeletedMixin):
    sale_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=False, blank=False)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, null=False, blank=False)
    invoice = models.CharField(
        max_length=100, default=generate_random_code, unique=True, editable=False
    )
    date = models.DateTimeField()
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    commission_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        db_table = 'sale'
        ordering = ['-date']
        verbose_name = 'sale'
        verbose_name_plural = 'sales'

    def __str__(self):
        return f'{self.invoice}, {self.seller.name}, {self.customer.name}'

    @property
    def total_quantity(self):
        return sum(item.quantity for item in self.sale_items.all())
