import uuid

from django.db import models

from apps.core.models import TimestampableMixin, DeletedMixin, Person


class Seller(TimestampableMixin, DeletedMixin, Person):
    seller_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    contract_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'seller'
        ordering = ['name']
        verbose_name = 'seller'
        verbose_name_plural = 'sellers'

    def __str__(self):
        return f'{self.name}, {self.document}'

