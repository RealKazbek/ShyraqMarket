from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.cache import cache
from .models import User

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "phone", "address", "role", "avatar"]

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.avatar and hasattr(obj.avatar, "url"):
            if request:
                return request.build_absolute_uri(obj.avatar.url)
            return obj.avatar.url  # fallback без request
        if request:
            return request.build_absolute_uri("/media/avatars/default.png")
        return "/media/avatars/default.png"


class SendCodeSerializer(serializers.Serializer):
    phone = serializers.CharField()


class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(required=False, allow_blank=True)
    phone = serializers.CharField()
    code = serializers.CharField()

    def validate(self, data):
        saved_code = cache.get(f"otp_{data['phone']}")
        if not saved_code or saved_code != data["code"]:
            raise serializers.ValidationError("Неверный или просроченный код")
        return data

    def create(self, validated_data):
        user, created = User.objects.get_or_create(
            phone=validated_data["phone"],
            defaults={"username": validated_data.get("username")},
        )
        return user

    def to_representation(self, instance):
        refresh = RefreshToken.for_user(instance)
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            # ✅ теперь передаем request внутрь UserSerializer
            "user": UserSerializer(instance, context=self.context).data,
        }


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    code = serializers.CharField()

    def validate(self, data):
        saved_code = cache.get(f"otp_{data['phone']}")
        if not saved_code or saved_code != data["code"]:
            raise serializers.ValidationError("Неверный или просроченный код")

        try:
            user = User.objects.get(phone=data["phone"])
        except User.DoesNotExist:
            raise serializers.ValidationError("Пользователь не найден")

        data["user"] = user
        return data

    def create(self, validated_data):
        user = validated_data["user"]
        refresh = RefreshToken.for_user(user)
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            # ✅ и тут тоже передаем context
            "user": UserSerializer(user, context=self.context).data,
        }
    
class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "role")