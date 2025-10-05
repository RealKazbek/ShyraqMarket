import requests
from bs4 import BeautifulSoup
from .models import Product

def scrape_category(url="https://1688.ru/category/126442003/"):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, "html.parser")

    products = soup.select(".product-item")
    for product in products:
        fav_btn = product.select_one(".fav-btn")
        product_id = fav_btn["data-id"] if fav_btn else None

        link = product.select_one("a.item-product")
        href = link["href"] if link else None
        full_link = f"https://1688.ru{href}" if href and href.startswith("/") else href

        img = product.select_one(".product-image img")
        img_src = img.get("data-src") or img.get("src") if img else None

        price = product.select_one(".product-price .price")
        price_text = price.text.strip() if price else None

        title = product.select_one(".product-title")
        title_text = title.text.strip() if title else None

        if product_id:
            Product.objects.update_or_create(
                product_id=product_id,
                defaults={
                    "title": title_text,
                    "price": price_text,
                    "link": full_link,
                    "image": img_src,
                },
            )
        else:
            Product.objects.create(
                title=title_text,
                price=price_text,
                link=full_link,
                image=img_src,
            )