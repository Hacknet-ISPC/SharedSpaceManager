from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Rol

Usuario = get_user_model()


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ["id", "nombre_rol", "descripcion"]


class UsuarioSerializer(serializers.ModelSerializer):
    """Para leer datos de usuarios. Nunca expone la contraseña."""

    rol_nombre = serializers.CharField(source="rol.nombre_rol", read_only=True)

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "rol",
            "rol_nombre",
            "date_joined",
        ]
        read_only_fields = ["rol", "date_joined"]


class RegistroSerializer(serializers.ModelSerializer):
    """Para registrar usuarios nuevos."""

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = Usuario
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        # create_user hashea la contraseña
        usuario = Usuario.objects.create_user(**validated_data)
        # Todo registro público entra como Cliente
        usuario.rol = Rol.objects.filter(nombre_rol="Cliente").first()
        usuario.save()
        return usuario


class LoginSerializer(serializers.Serializer):
    """Para iniciar sesión únicamente con correo electrónico y contraseña."""

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email:
            raise serializers.ValidationError(
                "Debe proporcionar un correo electrónico."
            )

        if not password:
            raise serializers.ValidationError("Debe proporcionar una contraseña.")

        usuario = Usuario.objects.filter(email__iexact=email).first()

        if not usuario or not usuario.check_password(password):
            raise serializers.ValidationError(
                "Credenciales inválidas. Verifique su correo y contraseña."
            )

        if not usuario.is_active:
            raise serializers.ValidationError(
                "Esta cuenta de usuario se encuentra inactiva."
            )

        attrs["usuario"] = usuario
        return attrs


