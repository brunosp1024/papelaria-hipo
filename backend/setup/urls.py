from django.contrib import admin
from django.urls import path, include, reverse_lazy
from django.views.generic import RedirectView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# swagger documentation
schema_view = get_schema_view(
   openapi.Info(
      title="Papelaria Hipo",
      default_version='v1',
      description="Product sales management",
      terms_of_service="#",
      contact=openapi.Contact(email="bruno.tech@amcom.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', RedirectView.as_view(url=reverse_lazy('schema-swagger-ui'), permanent=False), name='index'),
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.product.urls', namespace='products')),
    path('api/v1/', include('apps.seller.urls', namespace='sellers')),
    path('api/v1/', include('apps.customer.urls', namespace='customers')),
    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
