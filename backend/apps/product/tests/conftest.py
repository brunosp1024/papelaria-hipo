import pytest
import base64

from rest_framework.test import APIClient
from model_bakery import baker
from apps.product.models import Product


@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user(django_user_model):
    user = django_user_model.objects.create_user(username='stranger', password='secret')
    return user

@pytest.fixture
def client(user, api_client):
    credentials = base64.b64encode('stranger:secret'.encode('utf-8')).decode('utf-8')
    api_client.credentials(HTTP_AUTHORIZATION='Basic ' + credentials)
    return api_client

@pytest.fixture
def instance_product_dict():
    product = baker.prepare(Product)
    product_dict = {
        'code': product.code,
        'description': product.description,
        'unit_price': str(product.unit_price),
        'commission_percentage': str(product.commission_percentage),
    }
    return product_dict

@pytest.fixture
def object_product_dict():
    product = baker.make(Product)
    product_dict = {
        'product_id': str(product.product_id),
        'code': product.code,
        'description': product.description,
        'unit_price': str(product.unit_price),
        'commission_percentage': str(product.commission_percentage),
    }
    return product_dict