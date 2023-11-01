import json
import pytest

from model_bakery import baker
from apps.product.models import Product


pytestmark = pytest.mark.django_db

class TestProductEndpoints:

    endpoint = '/api/v1/products/'

    def test_list_all_products(self, client):        
        baker.make(Product, _quantity=3)
        response = client.get(self.endpoint)
        assert response.status_code == 200
        print(json.loads(response.content))
        assert len(json.loads(response.content)) == 3

    def test_create_new_product(self, client, instance_product_dict):
        response = client.post(
            self.endpoint,
            data=instance_product_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 201
        assert all(item in response_dict.items() for item in instance_product_dict.items()) == True

    def test_retrieve_one_product(self, client, object_product_dict):
        url = f'{self.endpoint}{object_product_dict["product_id"]}/'
        response = client.get(url)
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in object_product_dict.items()) == True

    def test_update_product(self, client, instance_product_dict):
        old_product = baker.make(Product)
        url = f'{self.endpoint}{old_product.product_id}/'
        response = client.put(
            url,
            instance_product_dict,
            format='json'
        )
        response_dict = json.loads(response.content.decode('utf-8'))
        assert response.status_code == 200
        assert all(item in response_dict.items() for item in instance_product_dict.items()) == True

    @pytest.mark.parametrize(
        'field', [
            ('code'), ('description'),
            ('unit_price'), ('commission_percentage')
        ]
    )
    def test_partial_update(self, field, client, instance_product_dict):
        product = baker.make(Product)
        valid_field = instance_product_dict[field]
        url = f'{self.endpoint}{product.product_id}/'
        response = client.patch(
            url,
            {field: valid_field},
            format='json'
        )
        assert response.status_code == 200
        assert json.loads(response.content)[field] == valid_field

    def test_delete(self, client):
        product = baker.make(Product)
        url = f'{self.endpoint}{product.product_id}/'
        response = client.delete(url)
        assert response.status_code == 204
        assert Product.objects.all().count() == 0