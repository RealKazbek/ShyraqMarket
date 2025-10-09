from django.db import models
import uuid

class Product(models.Model):
    product_id = models.CharField(default=uuid.uuid4, max_length=100, unique=True)  # для соответствия TS
    title = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # одно поле вместо price_cny/price_kzt
    image = models.URLField(blank=True, null=True)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.product_id})"