from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path("api/auth/", include("users.urls")),
    path("api/individual/", include("individual.urls")),
    path("admin/", admin.site.urls),
]