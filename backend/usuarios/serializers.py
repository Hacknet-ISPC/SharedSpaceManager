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
    """Para iniciar sesión validando credenciales contra la base de datos."""

    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        email = attrs.get("email")
        password = attrs.get("password")

        if not username and not email:
            raise serializers.ValidationError(
                "Debe proporcionar un nombre de usuario o un correo electrónico."
            )

        if not password:
            raise serializers.ValidationError("Debe proporcionar una contraseña.")

        usuario = None
        if email:
            usuario = Usuario.objects.filter(email__iexact=email).first()
        if not usuario and username:
            usuario = Usuario.objects.filter(username__iexact=username).first()

        if not usuario or not usuario.check_password(password):
            raise serializers.ValidationError(
                "Credenciales inválidas. Verifique sus datos e intente nuevamente."
            )

        if not usuario.is_active:
            raise serializers.ValidationError(
                "Esta cuenta de usuario se encuentra inactiva."
            )

        attrs["usuario"] = usuario
        return attrs

