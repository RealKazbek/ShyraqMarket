from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from .scraper import scrape_product
from rest_framework.permissions import AllowAny


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

@api_view(["POST"])
def add_product(request):
    url = request.data.get("url")
    if not url:
        return Response({"error": "url is required"}, status=400)

    product_data = scrape_product(url)
    serializer = ProductSerializer(data=product_data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)
