from django.contrib import admin

# Register your models here.
from .models import Pickup, Challenge, Reward, RecyclingHistory, MarketplaceItem

admin.site.register(Pickup)
admin.site.register(Challenge)
admin.site.register(Reward)
admin.site.register(RecyclingHistory)
admin.site.register(MarketplaceItem)
