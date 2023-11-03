from rest_framework.viewsets import ModelViewSet

from .models import Seller
from .serializers import SellerSerializer


class SellerViewSet(ModelViewSet):
    """ Implements all actions to sellers: list, create, retrieve, update e delete """

    serializer_class = SellerSerializer
    queryset = Seller.objects.all()
