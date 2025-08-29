from rest_framework import serializers
from .models import Pickup, Challenge, Reward, RecyclingHistory, MarketplaceItem
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_joined']

class PickupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pickup
        fields = ['id', 'date', 'address', 'status', 'materials', 'created_at']

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = ['id', 'title', 'description', 'target', 'progress', 'points_reward', 
                  'start_date', 'end_date', 'is_active', 'created_at']

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ['id', 'name', 'points_required', 'description', 'is_claimed', 'claimed_at', 'created_at']

class RecyclingHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecyclingHistory
        fields = ['id', 'material_type', 'weight_kg', 'date', 'co2_saved_kg', 'created_at']

class MarketplaceItemSerializer(serializers.ModelSerializer):
    seller_name = serializers.SerializerMethodField()
    
    class Meta:
        model = MarketplaceItem
        fields = ['id', 'name', 'description', 'price', 'category', 'image', 
                  'is_available', 'created_at', 'seller_name']
    
    def get_seller_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

class IndividualDashboardSerializer(serializers.Serializer):
    user = UserSerializer()
    upcoming_pickups = PickupSerializer(many=True)
    past_pickups = PickupSerializer(many=True)
    active_challenges = ChallengeSerializer(many=True)
    completed_challenges = ChallengeSerializer(many=True)
    rewards = RewardSerializer(many=True)
    recycling_history = RecyclingHistorySerializer(many=True)
    total_recycled_kg = serializers.DecimalField(max_digits=10, decimal_places=2)
    co2_saved_total = serializers.DecimalField(max_digits=10, decimal_places=2)
    challenges_completed_count = serializers.IntegerField()