from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import PickupRequest, RecyclingCenterStats, MarketplacePurchase, CenterPerformanceMetrics
from .serializers import (
    CenterDashboardSerializer, 
    PickupRequestSerializer, 
    RecyclingCenterStatsSerializer, 
    MarketplacePurchaseSerializer, 
    CenterPerformanceMetricsSerializer
)
from django.db.models import Sum
from datetime import datetime, timedelta
from django.utils import timezone

class CenterDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get the center (current user)
        center = request.user
        
        # Calculate total processed materials
        total_processed = RecyclingCenterStats.objects.filter(
            center=center
        ).aggregate(
            total=Sum('plastic_kg') + Sum('paper_kg') + Sum('metal_kg') + Sum('glass_kg') + Sum('electronics_kg')
        )['total'] or 0
        
        # Get weekly volume data (last 4 weeks)
        weekly_volume = []
        weekly_co2_saved = []
        today = timezone.now().date()
        
        for i in range(4):
            start_date = today - timedelta(weeks=i+1)
            end_date = today - timedelta(weeks=i)
            
            week_stats = RecyclingCenterStats.objects.filter(
                center=center,
                date__gte=start_date,
                date__lt=end_date
            ).aggregate(
                volume=Sum('plastic_kg') + Sum('paper_kg') + Sum('metal_kg') + Sum('glass_kg') + Sum('electronics_kg'),
                co2=Sum('co2_saved_kg')
            )
            
            weekly_volume.append(week_stats['volume'] or 0)
            weekly_co2_saved.append(week_stats['co2'] or 0)
        
        # Get pending and completed pickups
        pending_pickups = PickupRequest.objects.filter(
            status='pending'
        ).count()
        
        completed_pickups = PickupRequest.objects.filter(
            status='completed'
            ).count()
        
        # Monthly stats
        first_day_month = today.replace(day=1)
        monthly_stats = RecyclingCenterStats.objects.filter(
            center=center,
            date__gte=first_day_month
        ).aggregate(
            plastic=Sum('plastic_kg') or 0,
            paper=Sum('paper_kg') or 0,
            metal=Sum('metal_kg') or 0,
            glass=Sum('glass_kg') or 0,
            electronics=Sum('electronics_kg') or 0,
            co2_saved=Sum('co2_saved_kg') or 0
        )
        
        # Performance data
        performance_data = {
            'weeklyVolume': weekly_volume,
            'weeklyCO2': weekly_co2_saved,
            'satisfaction': 4.5,  # Mock data
            'efficiency': 92  # Mock data
        }
        
        # Weekly purchases (mock data for now)
        weekly_purchases = [
            {
                'id': 1,
                'customer': 'Alex Johnson',
                'material': 'Plastic',
                'quantity': 15.5,
                'date': '2023-06-15',
                'amount': 46.50
            },
            {
                'id': 2,
                'customer': 'Maria Garcia',
                'material': 'Paper',
                'quantity': 22.0,
                'date': '2023-06-14',
                'amount': 33.00
            },
            {
                'id': 3,
                'customer': 'James Wilson',
                'material': 'Metal',
                'quantity': 8.2,
                'date': '2023-06-14',
                'amount': 41.00
            }
        ]
        
        data = {
            'total_processed': total_processed,
            'weekly_volume': weekly_volume,
            'weekly_co2_saved': weekly_co2_saved,
            'pending_pickups': pending_pickups,
            'completed_pickups': completed_pickups,
            'monthly_stats': monthly_stats,
            'performance_data': performance_data,
            'weekly_purchases': weekly_purchases
        }
        
        serializer = CenterDashboardSerializer(data)
        return Response(serializer.data)

class PickupQueueView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        status = request.GET.get('status', 'all')
        
        if status != 'all':
            pickups = PickupRequest.objects.filter(status=status)
        else:
            pickups = PickupRequest.objects.all()
            
        serializer = PickupRequestSerializer(pickups, many=True)
        return Response(serializer.data)
    
    def post(self, request, pk):
        action = request.data.get('action')
        try:
            pickup = PickupRequest.objects.get(pk=pk)
            if action == 'approve':
                pickup.status = 'approved'
            elif action == 'complete':
                pickup.status = 'completed'
            elif action == 'cancel':
                pickup.status = 'cancelled'
            pickup.save()
            return Response({'message': f'Pickup {action}d successfully'})
        except PickupRequest.DoesNotExist:
            return Response({'error': 'Pickup not found'}, status=404)

class RecyclingStatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        time_range = request.GET.get('range', 'monthly')
        
        if time_range == 'monthly':
            # Get stats for current month
            today = timezone.now().date()
            first_day = today.replace(day=1)
            stats = RecyclingCenterStats.objects.filter(date__gte=first_day)
        elif time_range == 'weekly':
            # Get stats for current week
            today = timezone.now().date()
            start_week = today - timedelta(days=today.weekday())
            stats = RecyclingCenterStats.objects.filter(date__gte=start_week)
        else:
            # Get all stats
            stats = RecyclingCenterStats.objects.all()
            
        serializer = RecyclingCenterStatsSerializer(stats, many=True)
        return Response(serializer.data)

class MarketplacePurchasesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        category = request.GET.get('category', 'all')
        search = request.GET.get('search', '')
        
        purchases = MarketplacePurchase.objects.all()
        
        if category != 'all':
            purchases = purchases.filter(material=category)
            
        if search:
            purchases = purchases.filter(
                models.Q(buyer__first_name__icontains=search) |
                models.Q(buyer__last_name__icontains=search) |
                models.Q(material__icontains=search)
            )
            
        serializer = MarketplacePurchaseSerializer(purchases, many=True)
        return Response(serializer.data)

class PerformanceMetricsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        time_range = request.GET.get('range', 'monthly')
        
        if time_range == 'monthly':
            # Get metrics for last 4 weeks
            today = timezone.now().date()
            metrics = CenterPerformanceMetrics.objects.filter(
                week_start_date__gte=today - timedelta(weeks=4)
            )
        else:
            # Get all metrics
            metrics = CenterPerformanceMetrics.objects.all()
            
        serializer = CenterPerformanceMetricsSerializer(metrics, many=True)
        return Response(serializer.data)