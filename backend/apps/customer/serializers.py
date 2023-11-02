from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = [
            'customer_id', 'name', 'code', 'document',
            'phone', 'email', 'birth_date', 'status',
            'created_at', 'updated_at'
        ]
