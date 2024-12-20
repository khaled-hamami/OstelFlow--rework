# Generated by Django 5.0.1 on 2024-02-01 08:20

import django.core.validators
from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_hotel_price_hotel_images_hotel_preference_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='price',
            field=models.DecimalField(decimal_places=2, default=Decimal('0.00'), max_digits=6, validators=[django.core.validators.MinValueValidator(Decimal('0.00'))]),
        ),
    ]
