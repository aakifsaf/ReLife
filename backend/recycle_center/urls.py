from django.urls import path
from . import views

app_name = 'recycle_center'

urlpatterns = [
    path('dashboard/', views.CenterDashboardView.as_view(), name='dashboard'),
    path('pickups/', views.PickupQueueView.as_view(), name='pickups'),
    path('pickups/<int:pk>/', views.PickupQueueView.as_view(), name='pickup_action'),
    path('stats/', views.RecyclingStatsView.as_view(), name='stats'),
    path('purchases/', views.MarketplacePurchasesView.as_view(), name='purchases'),
    path('performance/', views.PerformanceMetricsView.as_view(), name='performance'),
]