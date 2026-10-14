from django.contrib import admin

from .models import Desarrollador


@admin.register(Desarrollador)
class DesarrolladorAdmin(admin.ModelAdmin):
    list_display = ("nombre", "rol", "linkedin","foto")
