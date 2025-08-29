from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db.models import Sum
from .models import Pickup, Challenge, Reward, RecyclingHistory, MarketplaceItem
from .serializers import IndividualDashboardSerializer, PickupSerializer, ChallengeSerializer, RewardSerializer, MarketplaceItemSerializer
from users.models import User
from django.db import models

class IndividualDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Get user's pickups
        upcoming_pickups = Pickup.objects.filter(
            user=user, 
            status__in=['scheduled', 'pending']
        ).order_by('date')[:5]  # Limit to 5 upcoming pickups
        
        past_pickups = Pickup.objects.filter(
            user=user, 
            status='completed'
        ).order_by('-date')[:10]  # Limit to 10 past pickups
        
        # Get user's challenges
        active_challenges = Challenge.objects.filter(
            user=user, 
            is_active=True
        ).order_by('-start_date')
        
        completed_challenges = Challenge.objects.filter(
            user=user, 
            progress__gte=models.F('target')
        ).order_by('-end_date')
        
        # Get user's rewards
        rewards = Reward.objects.filter(user=user).order_by('-created_at')
        
        # Get recycling history
        recycling_history = RecyclingHistory.objects.filter(
            user=user
        ).order_by('-date')[:10]  # Last 10 recycling entries
        
        # Calculate stats
        total_recycled = RecyclingHistory.objects.filter(user=user).aggregate(
            total=Sum('weight_kg')
        )['total'] or 0
        
        co2_saved = RecyclingHistory.objects.filter(user=user).aggregate(
            total=Sum('co2_saved_kg')
        )['total'] or 0
        
        challenges_completed = completed_challenges.count()
        
        # Prepare data for serializer
        data = {
            'user': user,
            'upcoming_pickups': upcoming_pickups,
            'past_pickups': past_pickups,
            'active_challenges': active_challenges,
            'completed_challenges': completed_challenges,
            'rewards': rewards,
            'recycling_history': recycling_history,
            'total_recycled_kg': total_recycled,
            'co2_saved_total': co2_saved,
            'challenges_completed_count': challenges_completed,
        }
        
        serializer = IndividualDashboardSerializer(data)
        return Response(serializer.data)

class PickupListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        pickup_type = request.query_params.get('type', 'all')
        
        if pickup_type == 'upcoming':
            pickups = Pickup.objects.filter(
                user=user, 
                status__in=['scheduled', 'pending']
            ).order_by('date')
        elif pickup_type == 'past':
            pickups = Pickup.objects.filter(
                user=user, 
                status='completed'
            ).order_by('-date')
        else:
            pickups = Pickup.objects.filter(user=user).order_by('-date')
        
        serializer = PickupSerializer(pickups, many=True)
        return Response(serializer.data)

class ChallengeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        challenge_type = request.query_params.get('type', 'all')
        
        if challenge_type == 'active':
            challenges = Challenge.objects.filter(
                user=user, 
                is_active=True,
                progress__lt=models.F('target')
            ).order_by('-start_date')
        elif challenge_type == 'completed':
            challenges = Challenge.objects.filter(
                user=user, 
                progress__gte=models.F('target')
            ).order_by('-end_date')
        else:
            challenges = Challenge.objects.filter(user=user).order_by('-start_date')
        
        serializer = ChallengeSerializer(challenges, many=True)
        return Response(serializer.data)

class RewardListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        reward_type = request.query_params.get('type', 'all')
        
        if reward_type == 'available':
            rewards = Reward.objects.filter(
                user=user, 
                is_claimed=False
            ).order_by('-created_at')
        elif reward_type == 'claimed':
            rewards = Reward.objects.filter(
                user=user, 
                is_claimed=True
            ).order_by('-claimed_at')
        else:
            rewards = Reward.objects.filter(user=user).order_by('-created_at')
        
        serializer = RewardSerializer(rewards, many=True)
        return Response(serializer.data)

class MarketplaceListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        category = request.query_params.get('category', 'all')
        search = request.query_params.get('search', '')
        
        items = MarketplaceItem.objects.filter(is_available=True)
        
        if category != 'all':
            items = items.filter(category=category)
            
        if search:
            items = items.filter(
                models.Q(name__icontains=search) | 
                models.Q(description__icontains=search)
            )
        
        items = items.order_by('-created_at')
        serializer = MarketplaceItemSerializer(items, many=True)
        return Response(serializer.data)

class MarketplaceCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MarketplaceItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)