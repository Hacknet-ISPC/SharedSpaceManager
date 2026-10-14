from django.contrib import admin

from .models import Reserva


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ("cancha", "usuario", "fecha", "hora_inicio", "hora_fin", "estado")
    list_filter = ("estado", "fecha", "cancha")
