from django.contrib import admin
from .models import Seller


class SellerAdmin(admin.ModelAdmin):
    list_display = ('name', 'document', 'phone', 'email')
    list_display_links = ('name', 'document')
    search_fields = ('name', 'document')
    list_per_page = 20

admin.site.register(Seller, SellerAdmin)

