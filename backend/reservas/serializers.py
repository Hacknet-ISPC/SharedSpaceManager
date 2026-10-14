from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import Reserva


class ReservaSerializer(serializers.ModelSerializer):
    cancha_nombre = serializers.CharField(source="cancha.nombre", read_only=True)
    usuario_nombre = serializers.CharField(
        source="usuario.get_full_name", read_only=True
    )

    class Meta:
        model = Reserva
        fields = [
            "id",
            "usuario",
            "usuario_nombre",
            "cancha",
            "cancha_nombre",
            "fecha",
            "hora_inicio",
            "hora_fin",
            "estado",
        ]
        # El usuario se toma de la sesión, no del body
        read_only_fields = ["usuario"]

    def validate(self, attrs):
        """Reutiliza las reglas del modelo (horarios, cancha disponible,
        solapamiento) y las devuelve como error 400"""
        actual = self.instance
        temporal = Reserva(
            pk=actual.pk if actual else None,
            cancha=attrs.get("cancha", getattr(actual, "cancha", None)),
            fecha=attrs.get("fecha", getattr(actual, "fecha", None)),
            hora_inicio=attrs.get("hora_inicio", getattr(actual, "hora_inicio", None)),
            hora_fin=attrs.get("hora_fin", getattr(actual, "hora_fin", None)),
            estado=attrs.get(
                "estado", getattr(actual, "estado", Reserva.Estado.PENDIENTE)
            ),
        )
        try:
            temporal.clean()
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return attrs
