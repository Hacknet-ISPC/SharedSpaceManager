from django.db import models


class Desarrollador(models.Model):
    nombre = models.CharField(max_length=45)
    rol = models.CharField(max_length=45, default="Desarrollador")
    linkedin = models.URLField(max_length=255, blank=True)
    foto = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name_plural = "desarrolladores"

    def __str__(self):
        return self.nombre
