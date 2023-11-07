from django.db import models
import uuid

from apps.core.models.mixins import TimestampableMixin

class CommissionSetup(TimestampableMixin):

    class Days(models.TextChoices):
        MONDAY = '0', 'Segunda'
        TUESDAY = '1', 'Terça'
        WEDNESDAY = '2', 'Quarta'
        THURSDAY = '3', 'Quinta'
        FRIDAY = '4', 'Sexta'
        SATURDAY = '5', 'Sábado'
        SUNDAY = '6', 'Domingo'

    commission_setup_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    days = models.CharField(max_length=100)
    min_percentage = models.DecimalField(max_digits=4, decimal_places=2)
    max_percentage = models.DecimalField(max_digits=4, decimal_places=2)
    active = models.BooleanField()

    class Meta:
        db_table = 'commission_setup'
        ordering = ['-created_at']
        verbose_name = 'Commission setup'
        verbose_name_plural = 'Commission setups'

    def __str__(self):
        return f'{self.min_percentage}-{self.max_percentage}, {self.days}'

    def save(self):
        if self.active:
            CommissionSetup.objects.exclude(pk=self.pk).update(active=False)
        super().save()
