from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .serializers import SignUpSerializer, LoginSerializer
import random
from django.core.cache import cache
from django.conf import settings
from twilio.rest import Client
from .serializers import SendCodeSerializer

# class SendCodeView(APIView):
#     @swagger_auto_schema(request_body=SendCodeSerializer)
#     def post(self, request):
#         phone = request.data.get("phone")
#         if not phone:
#             return Response({"error": "Phone number required"}, status=status.HTTP_400_BAD_REQUEST)

#         code = str(random.randint(1000, 9999))
#         cache.set(f"otp_{phone}", code, timeout=300)

#         client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
#         message = client.messages.create(
#             from_=settings.TWILIO_WHATSAPP_FROM,
#             body=f"Ваш код подтверждения: {code}",
#             to=f"whatsapp:{phone}"
#         )

#         return Response({"message": "Код отправлен", "sid": message.sid}, status=status.HTTP_200_OK)
    
class SendCodeView(APIView):
    def post(self, request):
        phone = request.data.get("phone")
        if not phone:
            return Response({"error": "Phone number required"}, status=status.HTTP_400_BAD_REQUEST)

        cache.set(f"otp_{phone}", "1111", timeout=300)

        return Response({"message": "Код отправлен (тест: 1111)"}, status=status.HTTP_200_OK)

class SignUpView(APIView):
    @swagger_auto_schema(request_body=SignUpSerializer)
    def post(self, request):
        serializer = SignUpSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.to_representation(user), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            data = serializer.save()
            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
