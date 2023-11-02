from django.db import models


class Person(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    document = models.CharField(max_length=15)
    phone = models.CharField(max_length=11)
    email = models.CharField(max_length=100, null=True, blank=True)
    birth_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        abstract = True
