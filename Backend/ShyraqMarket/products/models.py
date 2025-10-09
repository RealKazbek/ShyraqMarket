from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=500)
    price_cny = models.FloatField()
    price_kzt = models.FloatField()
    image = models.URLField(blank=True, null=True)
    link = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
