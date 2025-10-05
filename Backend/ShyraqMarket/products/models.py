from django.db import models

class Product(models.Model):
    product_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    price = models.CharField(max_length=100, null=True, blank=True)
    link = models.URLField(null=True, blank=True)
    image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.title or "No title"