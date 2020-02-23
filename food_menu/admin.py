from django.contrib import admin
from .models import *

class inf(admin.ModelAdmin):
    pass

admin.site.register(Item_food, inf)

class inf(admin.ModelAdmin):
    pass

admin.site.register(Composition_food, inf)
