from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import (
    MakeUpViewSet, CosmeticViewSet, BundleViewSet, OfferViewSet,
    RegisterViewSet, LoginViewSet, UserViewSet
)

router = DefaultRouter()
router.register(r'makeup', MakeUpViewSet)
router.register(r'cosmetics', CosmeticViewSet)
router.register(r'bundles', BundleViewSet)
router.register(r'offers', OfferViewSet)
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # ✅ fixed here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
