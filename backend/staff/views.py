from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import SystemOverview, StaffActivityLog, SystemReport, StaffNotification
from .serializers import (
    StaffDashboardSerializer,
    SystemOverviewSerializer,
    StaffActivityLogSerializer,
    SystemReportSerializer,
    StaffNotificationSerializer
)
from django.db.models import Sum
from datetime import datetime, timedelta
from django.utils import timezone

class StaffDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get today's system overview
        today = timezone.now().date()
        try:
            overview = SystemOverview.objects.get(date=today)
        except SystemOverview.DoesNotExist:
            # Create a default overview if none exists for today
            overview = SystemOverview.objects.create(date=today)
        
        # Get recent activity (last 10)
        recent_activity = StaffActivityLog.objects.all()[:10]
        
        # Get recent reports (last 5)
        recent_reports = SystemReport.objects.all()[:5]
        
        # Get unread notifications
        notifications = StaffNotification.objects.filter(staff_member=request.user, is_read=False)
        
        data = {
            'total_users': overview.total_users,
            'total_pickups': overview.total_pickups,
            'total_recycled_kg': overview.total_recycled_kg,
            'co2_saved_kg': overview.co2_saved_kg,
            'active_challenges': overview.active_challenges,
            'completed_challenges': overview.completed_challenges,
            'recent_activity': recent_activity,
            'recent_reports': recent_reports,
            'notifications': notifications
        }
        
        serializer = StaffDashboardSerializer(data)
        return Response(serializer.data)

class SystemOverviewView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        time_range = request.GET.get('range', 'monthly')
        
        if time_range == 'monthly':
            # Get overview for current month
            today = timezone.now().date()
            first_day = today.replace(day=1)
            overviews = SystemOverview.objects.filter(date__gte=first_day)
        elif time_range == 'weekly':
            # Get overview for current week
            today = timezone.now().date()
            start_week = today - timedelta(days=today.weekday())
            overviews = SystemOverview.objects.filter(date__gte=start_week)
        else:
            # Get all overviews
            overviews = SystemOverview.objects.all()
            
        serializer = SystemOverviewSerializer(overviews, many=True)
        return Response(serializer.data)

class StaffActivityLogView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get activity logs with optional filtering
        action = request.GET.get('action', '')
        staff_member = request.GET.get('staff_member', '')
        
        logs = StaffActivityLog.objects.all()
        
        if action:
            logs = logs.filter(action=action)
            
        if staff_member:
            logs = logs.filter(staff_member_id=staff_member)
            
        # Pagination
        page = int(request.GET.get('page', 1))
        per_page = int(request.GET.get('per_page', 20))
        start = (page - 1) * per_page
        end = start + per_page
        
        serializer = StaffActivityLogSerializer(logs[start:end], many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Log a new activity
        serializer = StaffActivityLogSerializer(data={
            'staff_member': request.user.id,
            'action': request.data.get('action'),
            'description': request.data.get('description')
        })
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class SystemReportView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        report_type = request.GET.get('type', 'all')
        search = request.GET.get('search', '')
        
        reports = SystemReport.objects.all()
        
        if report_type != 'all':
            reports = reports.filter(report_type=report_type)
            
        if search:
            reports = reports.filter(
                models.Q(title__icontains=search) |
                models.Q(description__icontains=search)
            )
            
        # Pagination
        page = int(request.GET.get('page', 1))
        per_page = int(request.GET.get('per_page', 10))
        start = (page - 1) * per_page
        end = start + per_page
        
        serializer = SystemReportSerializer(reports[start:end], many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Generate a new report
        serializer = SystemReportSerializer(data={
            'generated_by': request.user.id,
            'report_type': request.data.get('report_type'),
            'start_date': request.data.get('start_date'),
            'end_date': request.data.get('end_date'),
            'data': request.data.get('data', {})
        })
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class StaffNotificationView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Get notifications for current user
        notifications = StaffNotification.objects.filter(staff_member=request.user)
        serializer = StaffNotificationSerializer(notifications, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # Create a new notification
        serializer = StaffNotificationSerializer(data={
            'staff_member': request.user.id,
            'title': request.data.get('title'),
            'message': request.data.get('message')
        })
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    def patch(self, request, pk):
        # Mark notification as read
        try:
            notification = StaffNotification.objects.get(pk=pk, staff_member=request.user)
            notification.is_read = True
            notification.save()
            serializer = StaffNotificationSerializer(notification)
            return Response(serializer.data)
        except StaffNotification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=404)