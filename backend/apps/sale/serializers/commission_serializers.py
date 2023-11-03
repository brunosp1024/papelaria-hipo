from rest_framework import serializers

from apps.sale.models import Sale


class CommissionSerializer(serializers.ModelSerializer):
    seller_code = serializers.CharField()
    seller_name = serializers.CharField()
    sales_count = serializers.IntegerField()
    commission_total = serializers.DecimalField(max_digits=6, decimal_places=2)

    class Meta:
        model = Sale
        fields = [
            'seller_id', 'seller_code', 'seller_name', 'sales_count', 'commission_total'
        ]