from rest_framework import serializers

from apps.sale.models import SaleItem


class SaleItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(source='product.product_id')
    product_name = serializers.CharField(source='product.description', read_only=True)
    product_price = serializers.CharField(source='product.unit_price', read_only=True)
    product_code = serializers.CharField(source='product.code', read_only=True)
    product_commission = serializers.CharField(
        source='product.commission_percentage', read_only=True
    )

    class Meta:
        model = SaleItem
        fields = [
            'sale_item_id', 'product_id', 'product_name', 'product_commission', 'product_code',
            'product_price', 'quantity', 'item_total', 'commission_total'
        ]