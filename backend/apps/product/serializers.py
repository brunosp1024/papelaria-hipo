from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'product_id', 'code', 'description',
            'unit_price', 'commission_percentage',
            'created_at', 'updated_at'
        ]