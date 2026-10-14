from rest_framework import serializers

from .models import Cancha, TipoCancha


class TipoCanchaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCancha
        fields = ["id", "nombre", "cantidad_jugadores", "descripcion"]


class CanchaSerializer(serializers.ModelSerializer):
    # Solo lectura: para que Angular muestre el tipo sin pedir otro endpoint
    tipo_nombre = serializers.CharField(source="tipo.nombre", read_only=True)
    cantidad_jugadores = serializers.IntegerField(
        source="tipo.cantidad_jugadores", read_only=True
    )

    class Meta:
        model = Cancha
        fields = [
            "id",
            "nombre",
            "superficie",
            "descripcion",
            "estado",
            "tipo",
            "tipo_nombre",
            "cantidad_jugadores",
        ]
