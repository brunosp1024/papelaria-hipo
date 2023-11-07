from rest_framework import serializers
from django.db import transaction

from apps.sale.models import Sale, SaleItem
from apps.sale.serializers import SaleItemSerializer
from apps.sale.models import CommissionSetup
from apps.product.models import Product


class SaleSerializer(serializers.ModelSerializer):
    sale_id = serializers.UUIDField(required=False)
    seller_id = serializers.UUIDField(source='seller.seller_id')
    customer_id = serializers.UUIDField(source='customer.customer_id')
    items = SaleItemSerializer(source='sale_items', many=True)
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    seller_name = serializers.CharField(source='seller.name', read_only=True)
    customer_code = serializers.CharField(source='customer.code', read_only=True)
    seller_code = serializers.CharField(source='seller.code', read_only=True)

    class Meta:
        model = Sale
        fields = [
            'sale_id', 'customer_id', 'seller_id', 'customer_name', 'seller_name', 'customer_code',
            'seller_code', 'invoice', 'date', 'total', 'commission_total', 'total_quantity', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('sale_items')
        sale_id = validated_data.get('sale_id', None)
        seller_id = validated_data.pop('seller')['seller_id']
        customer_id = validated_data.pop('customer')['customer_id']

        with transaction.atomic():
            sale = self.create_or_update_sale(sale_id, seller_id, customer_id, validated_data)
            commission_setup = CommissionSetup.objects.filter(active=True).first()
            days = []
            if commission_setup:
                min_percentage = commission_setup.min_percentage
                max_percentage = commission_setup.max_percentage
                days = commission_setup.days

            for item in items_data:
                product_id = item.pop('product')['product_id']
                product = Product.objects.filter(product_id=product_id).first()
                day_commission_percentage = product.commission_percentage

                if str(sale.date.weekday()) in days:
                    day_commission_percentage = \
                        max(min_percentage, min(max_percentage, day_commission_percentage))
                item['day_commission_percentage'] = day_commission_percentage

                SaleItem.objects.create(sale=sale, product_id=product_id, **item)
            sale.commission_total = sum([item.commission_total for item in sale.sale_items.all()])
            sale.save()
        return sale

    def create_or_update_sale(self, sale_id, seller_id, customer_id, validated_data):
        if sale_id:
            sale = Sale.objects.filter(sale_id=sale_id)
            sale.update(seller_id=seller_id, customer_id=customer_id, **validated_data)
            sale = sale.first()
            sale.sale_items.all().delete()
        else:
            sale = Sale.objects.create(
                seller_id=seller_id, customer_id=customer_id, **validated_data
            )

        return sale
