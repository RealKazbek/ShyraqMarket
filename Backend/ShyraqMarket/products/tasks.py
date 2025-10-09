from celery import shared_task
from .models import Product
from .scraper import scrape_product

@shared_task
def update_products():
    for product in Product.objects.all():
        new_data = scrape_product(product.link)
        product.title = new_data["title"]
        product.price_cny = new_data["price_cny"]
        product.price_kzt = new_data["price_kzt"]
        product.image = new_data["image"]
        product.save()
