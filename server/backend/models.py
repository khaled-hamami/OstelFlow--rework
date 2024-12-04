from django.db import models
from django.core.validators import MinValueValidator

from decimal import Decimal


class Hotel(models.Model):
    name = models.CharField(max_length=200, default="")
    description = models.TextField(default="")
    price = models.DecimalField(max_digits=6, decimal_places=2, default=Decimal('0.00'), validators=[MinValueValidator(Decimal('0.00'))])
    images = models.JSONField(default=list)  # Requires Django 3.1 and above
    location = models.CharField(max_length=200, default="")
    rating = models.IntegerField(default=0)
    type = models.CharField(max_length=200, default="")
    preference = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.name
