from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, add_product

router = DefaultRouter()
router.register(r'products', ProductViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("add_product/", add_product),
]