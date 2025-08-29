from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


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
    REQUIRED_FIELDS = []   
    objects = CustomUserManager()        # removes username requirement

    def __str__(self):
        return f"{self.email} ({self.user_type})"
