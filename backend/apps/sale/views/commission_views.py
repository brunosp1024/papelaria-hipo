from datetime import datetime, timedelta
from django.db.models import Count, Sum, F
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from apps.sale.models import Sale
from apps.sale.serializers import CommissionSerializer


class CommissionViewSet(ModelViewSet):

    serializer_class = CommissionSerializer
    authentication_classes = []
    queryset = Sale.objects.all()

    def get_queryset(self):
        queryset = Sale.objects.all()
        start_date = self.request.GET.get('start_date')
        end_date = self.request.GET.get('end_date')


        if start_date and end_date:
            start_date = datetime.strptime(start_date, '%Y-%m-%d')
            end_date = datetime.strptime(end_date, '%Y-%m-%d') + timedelta(days=1)
            queryset = queryset.filter(date__gte=start_date, date__lte=end_date)

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        seller_sales = queryset.values(
            'seller_id',
            seller_code=F('seller__code'),
            seller_name=F('seller__name')).annotate(
                sales_count=Count('seller'),
                commission_total=Sum('commission_total')
        ).order_by('seller__code')
        serializer = CommissionSerializer(seller_sales, many=True)
        return Response(serializer.data)
