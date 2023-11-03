from apps.sale.views import CommissionViewSet, SaleItemViewSet, SaleViewSet
from rest_framework.routers import DefaultRouter

app_name = 'sale'

class OptionalSlashRouter(DefaultRouter):
    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'

router = OptionalSlashRouter()
router.register(r'sales', SaleViewSet)
router.register(r'sale-items', SaleItemViewSet)
router.register(r'commissions', CommissionViewSet)

urlpatterns = router.urls