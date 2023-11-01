from rest_framework.viewsets import ModelViewSet
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Seller
from .serializers import SellerSerializer


class SellerViewSet(ModelViewSet):
    """ Implements all actions to sellers: list, create, retrieve, update e delete """

    serializer_class = SellerSerializer
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Seller.objects.all()
