from rest_framework import serializers

from .models import Desarrollador


class DesarrolladorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desarrollador
        fields = ["id", "nombre", "rol", "linkedin", "foto"]
