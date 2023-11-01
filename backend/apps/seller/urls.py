from apps.seller.views import SellerViewSet
from rest_framework.routers import DefaultRouter

app_name = 'seller'

class OptionalSlashRouter(DefaultRouter):
    def __init__(self):
        super().__init__()
        self.trailing_slash = '/?'

router = OptionalSlashRouter()
router.register(r'sellers', SellerViewSet)

urlpatterns = router.urls