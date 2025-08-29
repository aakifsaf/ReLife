from rest_framework import serializers
from .models import PickupRequest, RecyclingCenterStats, MarketplacePurchase, CenterPerformanceMetrics
from users.models import User

class PickupRequestSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    
    class Meta:
        model = PickupRequest
        fields = ['id', 'customer', 'customer_name', 'scheduled_date', 'address', 'items', 'status', 'created_at']
    
    def get_customer_name(self, obj):
        return f"{obj.customer.first_name} {obj.customer.last_name}"

class RecyclingCenterStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecyclingCenterStats
        fields = ['id', 'date', 'plastic_kg', 'paper_kg', 'metal_kg', 'glass_kg', 'electronics_kg', 'co2_saved_kg']

class MarketplacePurchaseSerializer(serializers.ModelSerializer):
    buyer_name = serializers.SerializerMethodField()
    seller_name = serializers.SerializerMethodField()
    
    class Meta:
        model = MarketplacePurchase
        fields = ['id', 'buyer', 'buyer_name', 'seller', 'seller_name', 'material', 'quantity_kg', 'price', 'transaction_date']
    
    def get_buyer_name(self, obj):
        return f"{obj.buyer.first_name} {obj.buyer.last_name}"
    
    def get_seller_name(self, obj):
        return f"{obj.seller.first_name} {obj.seller.last_name}"

class CenterPerformanceMetricsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterPerformanceMetrics
        fields = ['id', 'week_start_date', 'total_volume_kg', 'co2_saved_kg', 'pickups_completed', 'customer_satisfaction']

class CenterDashboardSerializer(serializers.Serializer):
    total_processed = serializers.FloatField()
    weekly_volume = serializers.ListField(child=serializers.FloatField())
    weekly_co2_saved = serializers.ListField(child=serializers.FloatField())
    pending_pickups = serializers.IntegerField()
    completed_pickups = serializers.IntegerField()
    monthly_stats = serializers.DictField()
    performance_data = serializers.DictField()
    weekly_purchases = serializers.ListField()