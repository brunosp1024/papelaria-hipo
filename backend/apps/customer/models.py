import uuid

from django.db import models

from apps.core.models import TimestampableMixin, DeletedMixin, Person


class Customer(TimestampableMixin, DeletedMixin, Person):

    class Status(models.TextChoices):
        BLOCKED = 'BLOCKED', 'Bloqueado'
        IN_REVISION = 'IN_REVISION', 'Em análise'
        LIBERATED = 'LIBERATED', 'Liberado'

    customer_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.LIBERATED)

    class Meta:
        db_table = 'customer'
        ordering = ['name']
        verbose_name = 'customer'
        verbose_name_plural = 'customers'

    def __str__(self):
        return f'{self.name}, {self.document}, {self.status}'
