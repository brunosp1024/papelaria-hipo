from rest_framework.viewsets import ModelViewSet

from apps.sale.models import Sale
from apps.sale.serializers import SaleSerializer


class SaleViewSet(ModelViewSet):

    serializer_class = SaleSerializer
    authentication_classes = []
    queryset = Sale.objects.all()
