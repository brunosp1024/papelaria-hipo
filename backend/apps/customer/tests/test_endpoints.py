import json
import pytest

from model_bakery import baker
from apps.customer.models import Customer


pytestmark = pytest.mark.django_db

class TestCustomerEndpoints:

    endpoint = '/api/v1/customers/'

    def test_list_all_customers(self, client):        
        baker.make(Customer, _quantity=3)
        response = client.get(self.endpoint)
        assert response.status_code == 200
        assert len(json.loads(response.content)) == 3

    def test_create_new_customer(self, client, instance_customer_dict):
        response = client.post(
            self.endpoint,
            data=instance_customer_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 201
        assert all(item in response_dict.items() for item in instance_customer_dict.items()) == True

    def test_retrieve_one_customer(self, client, object_customer_dict):
        url = f'{self.endpoint}{object_customer_dict["customer_id"]}/'
        response = client.get(url)
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in object_customer_dict.items()) == True

    def test_update_customer(self, client, instance_customer_dict):
        old_customer = baker.make(Customer)
        url = f'{self.endpoint}{old_customer.customer_id}/'
        response = client.put(
            url,
            instance_customer_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in instance_customer_dict.items()) == True

    @pytest.mark.parametrize(
        'field', [
            ('name'), ('code'), ('document'), ('phone'),
            ('email'), ('birth_date'), ('status')
        ]
    )
    def test_partial_update_customer(self, field, client, instance_customer_dict):
        customer = baker.make(Customer)
        valid_field = instance_customer_dict[field]
        url = f'{self.endpoint}{customer.customer_id}/'
        response = client.patch(
            url,
            {field: valid_field},
            format='json'
        )
        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, client):
        customer = baker.make(Customer)
        url = f'{self.endpoint}{customer.customer_id}/'
        response = client.delete(url)
        assert response.status_code == 204
        assert Customer.objects.all().count() == 0