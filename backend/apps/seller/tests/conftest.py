import pytest
import base64

from rest_framework.test import APIClient
from model_bakery import baker
from apps.seller.models import Seller


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
def instance_seller_dict():
    seller = baker.prepare(Seller)
    seller_dict = {
        'name': seller.name,
        'code': seller.code,
        'document': seller.document,
        'phone': seller.phone,
        'email': seller.email,
        'birth_date': seller.birth_date,
        'contract_date': seller.contract_date,
    }
    return seller_dict

@pytest.fixture
def object_seller_dict():
    seller = baker.make(Seller)
    seller_dict = {
        'seller_id': str(seller.seller_id),
        'name': seller.name,
        'code': seller.code,
        'document': seller.document,
        'phone': seller.phone,
        'email': seller.email,
        'birth_date': seller.birth_date,
        'contract_date': seller.contract_date,
    }
    return seller_dict