from rest_framework.viewsets import ModelViewSet

from apps.sale.serializers import SaleItemSerializer
from apps.sale.models import SaleItem


class SaleItemViewSet(ModelViewSet):

    serializer_class = SaleItemSerializer
    authentication_classes = []
    queryset = SaleItem.objects.all()
