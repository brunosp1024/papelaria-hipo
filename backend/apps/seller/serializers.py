from rest_framework import serializers
from .models import Seller


class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = [
            'seller_id', 'name', 'code', 'document', 'phone',
            'email', 'birth_date', 'contract_date',
            'created_at', 'updated_at'
        ]
