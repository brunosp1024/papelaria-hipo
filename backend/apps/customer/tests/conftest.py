import pytest
import base64

from rest_framework.test import APIClient
from model_bakery import baker
from apps.customer.models import Customer


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
def instance_customer_dict():
    customer = baker.prepare(Customer)
    customer_dict = {
        'name': customer.name,
        'code': customer.code,
        'document': customer.document,
        'phone': customer.phone,
        'email': customer.email,
        'birth_date': customer.birth_date,
        'status': customer.status,
    }
    return customer_dict

@pytest.fixture
def object_customer_dict():
    customer = baker.make(Customer)
    customer_dict = {
        'customer_id': str(customer.customer_id),
        'name': customer.name,
        'code': customer.code,
        'document': customer.document,
        'phone': customer.phone,
        'email': customer.email,
        'birth_date': customer.birth_date,
        'status': customer.status,
    }
    return customer_dict