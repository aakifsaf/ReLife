from django.urls import path
from . import views

app_name = 'staff'

urlpatterns = [
    path('dashboard/', views.StaffDashboardView.as_view(), name='dashboard'),
    path('overview/', views.SystemOverviewView.as_view(), name='overview'),
    path('activity/', views.StaffActivityLogView.as_view(), name='activity'),
    path('reports/', views.SystemReportView.as_view(), name='reports'),
    path('notifications/', views.StaffNotificationView.as_view(), name='notifications'),
    path('notifications/<int:pk>/', views.StaffNotificationView.as_view(), name='notification_detail'),
]