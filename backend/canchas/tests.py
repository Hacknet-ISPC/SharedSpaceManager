from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models

from canchas.models import Cancha


class Reserva(models.Model):
    class Estado(models.TextChoices):
        PENDIENTE = "pendiente", "Pendiente"
        CONFIRMADA = "confirmada", "Confirmada"
        CANCELADA = "cancelada", "Cancelada"
        FINALIZADA = "finalizada", "Finalizada"

    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="reservas",
    )
    cancha = models.ForeignKey(
        Cancha,
        on_delete=models.PROTECT,
        related_name="reservas",
    )
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    estado = models.CharField(
        max_length=45,
        choices=Estado.choices,
        default=Estado.PENDIENTE,
    )

    def clean(self):
        if self.hora_inicio and self.hora_fin and self.hora_fin <= self.hora_inicio:
            raise ValidationError("La hora de fin debe ser posterior a la de inicio.")

        if self.cancha_id and self.fecha and self.hora_inicio and self.hora_fin:
            if self.cancha.estado != Cancha.Estado.DISPONIBLE:
                raise ValidationError("La cancha no está disponible.")

            solapadas = (
                Reserva.objects.filter(
                    cancha=self.cancha,
                    fecha=self.fecha,
                    hora_inicio__lt=self.hora_fin,
                    hora_fin__gt=self.hora_inicio,
                )
                .exclude(estado=Reserva.Estado.CANCELADA)
                .exclude(pk=self.pk)
            )

            if solapadas.exists():
                raise ValidationError("La cancha ya está reservada en ese horario.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cancha} - {self.fecha} {self.hora_inicio}-{self.hora_fin}"
