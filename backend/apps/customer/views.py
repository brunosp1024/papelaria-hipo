from rest_framework.viewsets import ModelViewSet

from .models import Customer
from .serializers import CustomerSerializer


class CustomerViewSet(ModelViewSet):
    """ Implements all actions to customers: list, create, retrieve, update e delete """

    serializer_class = CustomerSerializer
    authentication_classes = []
    queryset = Customer.objects.all()
