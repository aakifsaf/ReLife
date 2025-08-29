from django.db import models
from django.conf import settings

class PickupRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    scheduled_date = models.DateTimeField()
    address = models.TextField()
    items = models.JSONField()  # Store items as JSON
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-scheduled_date']
    
    def __str__(self):
        return f"Pickup for {self.customer.email} on {self.scheduled_date}"

class RecyclingCenterStats(models.Model):
    center = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    plastic_kg = models.FloatField(default=0)
    paper_kg = models.FloatField(default=0)
    metal_kg = models.FloatField(default=0)
    glass_kg = models.FloatField(default=0)
    electronics_kg = models.FloatField(default=0)
    co2_saved_kg = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['center', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"Stats for {self.center.email} on {self.date}"

class MarketplacePurchase(models.Model):
    MATERIAL_CHOICES = [
        ('plastic', 'Plastic'),
        ('paper', 'Paper'),
        ('metal', 'Metal'),
        ('glass', 'Glass'),
        ('electronics', 'Electronics'),
    ]
    
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='purchases')
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sales')
    material = models.CharField(max_length=20, choices=MATERIAL_CHOICES)
    quantity_kg = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.buyer.email} purchased {self.quantity_kg}kg {self.material}"

class CenterPerformanceMetrics(models.Model):
    center = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    week_start_date = models.DateField()
    total_volume_kg = models.FloatField(default=0)
    co2_saved_kg = models.FloatField(default=0)
    pickups_completed = models.IntegerField(default=0)
    customer_satisfaction = models.FloatField(default=0)  # 0-5 rating
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['center', 'week_start_date']
        ordering = ['-week_start_date']
    
    def __str__(self):
        return f"Performance for {self.center.email} week of {self.week_start_date}"