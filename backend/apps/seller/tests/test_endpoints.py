import json
import pytest

from model_bakery import baker
from apps.seller.models import Seller


pytestmark = pytest.mark.django_db

class TestSellerEndpoints:

    endpoint = '/api/v1/sellers/'

    def test_list_all_sellers(self, client):        
        baker.make(Seller, _quantity=3)
        response = client.get(self.endpoint)
        assert response.status_code == 200
        assert len(json.loads(response.content)) == 3

    def test_create_new_seller(self, client, instance_seller_dict):
        response = client.post(
            self.endpoint,
            data=instance_seller_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 201
        assert all(item in response_dict.items() for item in instance_seller_dict.items()) == True

    def test_retrieve_one_seller(self, client, object_seller_dict):
        url = f'{self.endpoint}{object_seller_dict["seller_id"]}/'
        response = client.get(url)
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in object_seller_dict.items()) == True

    def test_update_seller(self, client, instance_seller_dict):
        old_seller = baker.make(Seller)
        url = f'{self.endpoint}{old_seller.seller_id}/'
        response = client.put(
            url,
            instance_seller_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in instance_seller_dict.items()) == True

    @pytest.mark.parametrize(
        'field', [
            ('name'), ('code'), ('document'), ('phone'),
            ('email'), ('birth_date'), ('contract_date')
        ]
    )
    def test_partial_update_seller(self, field, client, instance_seller_dict):
        seller = baker.make(Seller)
        valid_field = instance_seller_dict[field]
        url = f'{self.endpoint}{seller.seller_id}/'
        response = client.patch(
            url,
            {field: valid_field},
            format='json'
        )
        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, client):
        seller = baker.make(Seller)
        url = f'{self.endpoint}{seller.seller_id}/'
        response = client.delete(url)
        assert response.status_code == 204
        assert Seller.objects.all().count() == 0