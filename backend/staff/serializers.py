from rest_framework import serializers
from .models import SystemOverview, StaffActivityLog, SystemReport, StaffNotification
from users.models import User

class SystemOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemOverview
        fields = ['id', 'date', 'total_users', 'total_pickups', 'total_recycled_kg', 'co2_saved_kg', 'active_challenges', 'completed_challenges']

class StaffActivityLogSerializer(serializers.ModelSerializer):
    staff_member_name = serializers.SerializerMethodField()
    
    class Meta:
        model = StaffActivityLog
        fields = ['id', 'staff_member', 'staff_member_name', 'action', 'description', 'timestamp']
    
    def get_staff_member_name(self, obj):
        return f"{obj.staff_member.first_name} {obj.staff_member.last_name}"

class SystemReportSerializer(serializers.ModelSerializer):
    generated_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = SystemReport
        fields = ['id', 'generated_by', 'generated_by_name', 'report_type', 'start_date', 'end_date', 'data', 'generated_at']
    
    def get_generated_by_name(self, obj):
        return f"{obj.generated_by.first_name} {obj.generated_by.last_name}"

class StaffNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffNotification
        fields = ['id', 'staff_member', 'title', 'message', 'is_read', 'created_at']

class StaffDashboardSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    total_pickups = serializers.IntegerField()
    total_recycled_kg = serializers.FloatField()
    co2_saved_kg = serializers.FloatField()
    active_challenges = serializers.IntegerField()
    completed_challenges = serializers.IntegerField()
    recent_activity = serializers.ListField(child=StaffActivityLogSerializer())
    recent_reports = serializers.ListField(child=SystemReportSerializer())
    notifications = serializers.ListField(child=StaffNotificationSerializer())