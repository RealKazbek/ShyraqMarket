from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from drf_yasg.utils import swagger_auto_schema
from .models import Cart, CartItem
from .serializers import (
    CartSerializer,
    CartItemAddSerializer,
    CartItemDeleteSerializer,
)
from products.models import Product

class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_cart(self, user):
        cart, _ = Cart.objects.get_or_create(user=user)
        return cart

    # ---------------------------------------------------------------
    # GET /cart/ → получить корзину
    # ---------------------------------------------------------------
    @swagger_auto_schema(responses={200: CartSerializer})
    def get(self, request):
        cart = self.get_cart(request.user)
        return Response(CartSerializer(cart).data)

    # ---------------------------------------------------------------
    # POST /cart/ → добавить товар
    # ---------------------------------------------------------------
    # ---------------------------------------------------------------
    # POST /cart/ → добавить товар
    # ---------------------------------------------------------------
    @swagger_auto_schema(request_body=CartItemAddSerializer, responses={200: CartSerializer})
    def post(self, request):
        serializer = CartItemAddSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        cart = self.get_cart(request.user)

        # ✅ получаем сам объект Product
        try:
            product = Product.objects.get(product_id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # ✅ работаем через product, а не product_id
        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
            item.save()

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)


    # ---------------------------------------------------------------
    # DELETE /cart/ → удалить товар
    # ---------------------------------------------------------------
    @swagger_auto_schema(request_body=CartItemDeleteSerializer, responses={200: CartSerializer})
    def delete(self, request):
        serializer = CartItemDeleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data["product_id"]
        cart = self.get_cart(request.user)

        try:
            product = Product.objects.get(product_id=product_id)
            item = cart.items.get(product=product)   # ✅ ищем по объекту
            item.delete()
        except (Product.DoesNotExist, CartItem.DoesNotExist):
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(CartSerializer(cart).data, status=status.HTTP_200_OK)
