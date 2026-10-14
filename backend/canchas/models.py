from django.db import models


class TipoCancha(models.Model):
    nombre = models.CharField(max_length=45, unique=True)
    cantidad_jugadores = models.PositiveIntegerField()
    descripcion = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nombre


class Cancha(models.Model):
    class Estado(models.TextChoices):
        DISPONIBLE = "disponible", "Disponible"
        MANTENIMIENTO = "mantenimiento", "En mantenimiento"

    tipo = models.ForeignKey(
        TipoCancha,
        on_delete=models.PROTECT,
        related_name="canchas",
    )
    nombre = models.CharField(max_length=45)
    superficie = models.CharField(max_length=45, blank=True)
    descripcion = models.CharField(max_length=100, blank=True)
    estado = models.CharField(
        max_length=45,
        choices=Estado.choices,
        default=Estado.DISPONIBLE,
    )

    def __str__(self):
        return f"{self.nombre} ({self.tipo})"
