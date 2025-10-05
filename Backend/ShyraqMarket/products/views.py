from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from .parser import scrape_category
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        if request.GET.get("refresh") == "1":
            scrape_category()
        return super().list(request, *args, **kwargs)
