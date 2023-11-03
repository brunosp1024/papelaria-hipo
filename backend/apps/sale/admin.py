from django.contrib import admin

from apps.sale.models.sale_item import SaleItem
from .models import Sale


class SaleAdmin(admin.ModelAdmin):
    list_display = ('invoice', 'seller', 'customer', 'date')
    list_display_links = ('invoice',)
    search_fields = ('invoice', 'seller', 'customer')
    raw_id_fields = ('seller', 'customer')
    list_per_page = 20

admin.site.register(Sale, SaleAdmin)


class SaleItemAdmin(admin.ModelAdmin):
    list_display = ('sale', 'product', 'quantity')
    list_display_links = ('sale',)
    search_fields = ('sale__invoice', 'product__description')
    raw_id_fields = ('sale', 'product')
    list_per_page = 20

admin.site.register(SaleItem, SaleItemAdmin)

