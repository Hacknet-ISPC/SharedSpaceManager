from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from canchas.models import Cancha
from .models import Reserva


class ReservaSerializer(serializers.ModelSerializer):
    id_usuario = serializers.IntegerField(source="usuario_id", read_only=True)
    id_cancha = serializers.PrimaryKeyRelatedField(
        queryset=Cancha.objects.all(), source="cancha"
    )

    class Meta:
        model = Reserva
        fields = [
            "id",  # <--- Cambiado de id_reserva a id
            "id_usuario",
            "id_cancha",
            "fecha",
            "hora_inicio",
            "hora_fin",
            "estado",
        ]
        read_only_fields = ["id", "estado"]  # <--- Cambiado aquí también

    def validate(self, attrs):
        temporal = Reserva(
            cancha=attrs.get("cancha"),
            fecha=attrs.get("fecha"),
            hora_inicio=attrs.get("hora_inicio"),
            hora_fin=attrs.get("hora_fin"),
        )
        try:
            temporal.clean()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return attrs
