from datetime import datetime

from django.db import models


class CustomManager(models.Manager):
    def get_queryset(self):
        queryset = super().get_queryset().filter(deleted_at=None)
        return queryset

    class Meta:
        abstract = True


class DeletedMixin(models.Model):
    deleted_at = models.DateTimeField('Deleted at', default=None, null=True, blank=True)
    objects = CustomManager()
    dm_objects = models.Manager()

    def delete(self):
        self.deleted_at = datetime.now()
        self.save()

    class Meta:
        abstract = True