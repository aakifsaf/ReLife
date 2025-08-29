from django.urls import path
from .views import IndividualDashboardView, PickupListView, ChallengeListView, RewardListView, MarketplaceListView, MarketplaceCreateView

app_name = 'individual'

urlpatterns = [
    path('dashboard/', IndividualDashboardView.as_view(), name='dashboard'),
    path('pickups/', PickupListView.as_view(), name='pickups'),
    path('challenges/', ChallengeListView.as_view(), name='challenges'),
    path('rewards/', RewardListView.as_view(), name='rewards'),
    path('marketplace/', MarketplaceListView.as_view(), name='marketplace'),
    path('marketplace/create/', MarketplaceCreateView.as_view(), name='marketplace_create'),
]