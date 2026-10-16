from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from usuarios.models import Rol

Usuario = get_user_model()


class UsuariosAuthTests(APITestCase):
    def setUp(self):
        self.rol_admin = Rol.objects.create(
            nombre_rol="Administrador", descripcion="Gestiona el sistema"
        )
        self.rol_cliente = Rol.objects.create(
            nombre_rol="Cliente", descripcion="Realiza las reservas"
        )

        self.usuario = Usuario.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            first_name="Juan",
            last_name="Perez",
            password="Password1234",
            rol=self.rol_cliente,
        )

    def test_registro_usuario_exitoso(self):
        url = "/api/v1/usuarios/registro/"
        data = {
            "username": "nuevousuario",
            "first_name": "Carlos",
            "last_name": "Gomez",
            "email": "carlos@example.com",
            "password": "Password1234",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "nuevousuario")
        self.assertTrue(Usuario.objects.filter(username="nuevousuario").exists())

    def test_login_con_email_exitoso(self):
        url = "/api/v1/usuarios/login/"
        data = {
            "email": "testuser@example.com",
            "password": "Password1234",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("usuario", response.data)
        self.assertEqual(response.data["usuario"]["email"], "testuser@example.com")
        self.assertEqual(response.data["usuario"]["rol_nombre"], "Cliente")

    def test_login_requiere_email(self):
        url = "/api/v1/usuarios/login/"
        data = {
            "password": "Password1234",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_login_credenciales_invalidas(self):
        url = "/api/v1/usuarios/login/"
        data = {
            "email": "testuser@example.com",
            "password": "password_incorrecta",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


