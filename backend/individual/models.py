from django.db import models
from django.conf import settings

class Pickup(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField()
    address = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    materials = models.JSONField(default=dict)  # Store material types and quantities
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Pickup for {self.user.email} on {self.date}"

class Challenge(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    target = models.IntegerField()  # Target value (e.g., 10 pickups)
    progress = models.IntegerField(default=0)  # Current progress
    points_reward = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.title} - {self.user.email}"

class Reward(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    points_required = models.IntegerField()
    description = models.TextField()
    is_claimed = models.BooleanField(default=False)
    claimed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.email}"

class RecyclingHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    material_type = models.CharField(max_length=50)  # plastic, paper, metal, glass, electronics
    weight_kg = models.DecimalField(max_digits=10, decimal_places=2)
    pickup = models.ForeignKey(Pickup, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateTimeField()
    co2_saved_kg = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Recycling Histories"
        ordering = ['-date']

    def __str__(self):
        return f"{self.material_type} recycling by {self.user.email}"

class MarketplaceItem(models.Model):
    CATEGORY_CHOICES = [
        ('furniture', 'Furniture'),
        ('home_decor', 'Home Decor'),
        ('personal_care', 'Personal Care'),
        ('electronics', 'Electronics'),
        ('clothing', 'Clothing'),
        ('other', 'Other'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='marketplace/', blank=True, null=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.user.email}"