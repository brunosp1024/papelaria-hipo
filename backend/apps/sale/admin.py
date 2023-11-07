from django.contrib import admin

from apps.sale.models.sale_item import SaleItem
from apps.sale.models import CommissionSetup
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


class CommissionSetupAdmin(admin.ModelAdmin):
    list_display = ('commission_setup_id', 'min_percentage', 'max_percentage')
    list_display_links = ('commission_setup_id',)
    list_per_page = 20

admin.site.register(CommissionSetup, CommissionSetupAdmin)
