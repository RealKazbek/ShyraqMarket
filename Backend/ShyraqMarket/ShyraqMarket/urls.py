from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static

# Views
from products.views import ProductViewSet

# -------------------------------------------------------------------
# Routers
# -------------------------------------------------------------------
router = DefaultRouter()
router.register(r"products", ProductViewSet)

# -------------------------------------------------------------------
# Swagger Schema
# -------------------------------------------------------------------
schema_view = get_schema_view(
    openapi.Info(
        title="Shyraq Market API",
        default_version="v1",
        description="API documentation for Shyraq Market project",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

# -------------------------------------------------------------------
# URL Patterns
# -------------------------------------------------------------------
urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),

    # API (products, etc.)
    path("api/", include(router.urls)),

    # Auth (custom users app)
    path("auth/", include("users.urls")),
    path("cart/", include("cart.urls")),

    # Swagger / ReDoc
    path("swagger<format>/", schema_view.without_ui(cache_timeout=0), name="schema-json"),
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),

]

if settings.DEBUG:  # только в режиме разработки
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)