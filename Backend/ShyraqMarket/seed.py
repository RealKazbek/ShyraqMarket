import os
import django
import random
from faker import Faker
import uuid

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ShyraqMarket.settings")
django.setup()

from products.models import Product

fake = Faker()

for _ in range(50):
    title = fake.word().capitalize() + " " + fake.word().capitalize()
    
    # Цена в KZT (например, 1000–50000 тенге)
    price = round(random.uniform(1000, 50000), 2)
    
    # Уникальный product_id (UUID)
    product_id = str(uuid.uuid4())
    
    # Фото 9:16 с низким качеством
    image = f"https://picsum.photos/640/360?random={random.randint(1,10000)}"
    
    link = fake.url()

    Product.objects.create(
        product_id=product_id,
        title=title,
        price=price,
        image=image,
        link=link
    )

print("✅ 50 fake products created with product_id and 9:16 low-quality images!")
