from django.contrib import admin

from django.contrib import admin

from .models import Cancha, TipoCancha


@admin.register(TipoCancha)
class TipoCanchaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "cantidad_jugadores")


@admin.register(Cancha)
class CanchaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "tipo", "superficie", "estado")
    list_filter = ("tipo", "estado")
