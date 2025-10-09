from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import requests, re, random

# список User-Agent для ротации
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) Gecko/20100101 Firefox/119.0",
]

# --- переводчик
def translate(text, target="ru"):
    url = "https://translate.googleapis.com/translate_a/single"
    params = {"client": "gtx", "sl": "auto", "tl": target, "dt": "t", "q": text}
    r = requests.get(url, params=params)
    return r.json()[0][0][0]

# --- конвертация валют
def convert_price(price_cny: float):
    try:
        res = requests.get("https://api.exchangerate.host/convert?from=CNY&to=KZT")
        rate = res.json()["info"]["rate"]
    except:
        rate = 65.0
    return round(price_cny * rate, 2)

# --- парсер
def scrape_product(url: str, proxy: str = None):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, proxy={"server": proxy} if proxy else None)
        context = browser.new_context(user_agent=random.choice(USER_AGENTS))
        page = context.new_page()

        page.goto(url, timeout=60000)
        html = page.content()
        browser.close()

        soup = BeautifulSoup(html, "html.parser")
        title = soup.find("title").get_text().strip()
        images = [img["src"] for img in soup.find_all("img") if "src" in img.attrs]

        raw_text = soup.get_text()
        match = re.search(r"￥(\d+\.?\d*)", raw_text)
        price_cny = float(match.group(1)) if match else 100.0

        return {
            "title": translate(title, "ru"),
            "price_cny": price_cny,
            "price_kzt": convert_price(price_cny),
            "image": images[0] if images else "",
            "link": url,
        }