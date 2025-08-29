from django.db import models
from django.conf import settings
from users.models import User

class SystemOverview(models.Model):
    date = models.DateField(unique=True)
    total_users = models.IntegerField(default=0)
    total_pickups = models.IntegerField(default=0)
    total_recycled_kg = models.FloatField(default=0)
    co2_saved_kg = models.FloatField(default=0)
    active_challenges = models.IntegerField(default=0)
    completed_challenges = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date']
    
    def __str__(self):
        return f"System Overview for {self.date}"

class StaffActivityLog(models.Model):
    ACTION_CHOICES = [
        ('user_management', 'User Management'),
        ('challenge_creation', 'Challenge Creation'),
        ('report_generation', 'Report Generation'),
        ('system_maintenance', 'System Maintenance'),
        ('content_moderation', 'Content Moderation'),
    ]
    
    staff_member = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.staff_member.email} - {self.action} at {self.timestamp}"

class SystemReport(models.Model):
    REPORT_TYPES = [
        ('usage', 'Usage Statistics'),
        ('recycling', 'Recycling Impact'),
        ('user', 'User Activity'),
        ('financial', 'Financial Summary'),
    ]
    
    generated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=20, choices=REPORT_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    data = models.JSONField()
    generated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-generated_at']
    
    def __str__(self):
        return f"{self.get_report_type_display()} Report ({self.start_date} to {self.end_date})"

class StaffNotification(models.Model):
    staff_member = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Notification for {self.staff_member.email}: {self.title}"