from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Rol, Usuario


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (("Rol", {"fields": ("rol",)}),)
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Datos adicionales", {"fields": ("email", "rol")}),
    )
    list_display = ("username", "first_name", "last_name", "email", "rol", "is_staff")
    list_filter = UserAdmin.list_filter + ("rol",)


admin.site.register(Rol)
