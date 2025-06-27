from django.contrib import admin
from .models import *
# Register your models here.
# admin.py
from .models import MakeUp, Cosmetic, Bundle, Offer


admin.site.register(MakeUp)
admin.site.register(Cosmetic)
admin.site.register(Bundle)
admin.site.register(Offer)

admin.site.register(CustomUser)
