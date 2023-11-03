from rest_framework.viewsets import ModelViewSet

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
    """ Implements all actions to products: list, create, retrieve, update e delete """

    serializer_class = ProductSerializer
    authentication_classes = []
    queryset = Product.objects.all()
