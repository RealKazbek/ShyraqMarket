from rest_framework import serializers
from .models import Cart, CartItem
from products.serializers import ProductSerializer


# -------------------------------------------------------------------
# Item в корзине (чтение)
# -------------------------------------------------------------------
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]


# -------------------------------------------------------------------
# Корзина (чтение)
# -------------------------------------------------------------------
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "total_price"]


# -------------------------------------------------------------------
# Входные данные (запросы)
# -------------------------------------------------------------------
class CartItemAddSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()   # 🔑 UUID вместо IntegerField
    quantity = serializers.IntegerField(min_value=1, default=1)


class CartItemDeleteSerializer(serializers.Serializer):
    product_id = serializers.UUIDField()   # 🔑 UUID вместо IntegerField