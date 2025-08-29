from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_TYPES = (
        ("individual", "Individual"),
        ("household", "Household"),
        ("recycling_center", "Recycling Center"),
        ("staff", "Staff"),
    )

    username = None  # disable username field
    email = models.EmailField(unique=True)  # unique email for login
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default="individual")
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = "email"      # now email is the login field
    REQUIRED_FIELDS = []          # removes username requirement

    def __str__(self):
        return f"{self.email} ({self.user_type})"
