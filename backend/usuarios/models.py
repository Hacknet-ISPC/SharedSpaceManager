from django.contrib.auth.models import AbstractUser
from django.db import models


class Rol(models.Model):
    nombre_rol = models.CharField(max_length=45, unique=True)
    descripcion = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nombre_rol


class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    rol = models.ForeignKey(
        Rol,
        on_delete=models.PROTECT,
        related_name="usuarios",
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.get_full_name() or self.username
