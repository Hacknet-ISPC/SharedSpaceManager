from datetime import date, time

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction

from canchas.models import Cancha, TipoCancha
from core.models import Desarrollador
from reservas.models import Reserva
from usuarios.models import Rol

Usuario = get_user_model()


class Command(BaseCommand):
    help = "Carga datos de prueba (roles, usuarios, canchas, reservas, desarrolladores)"

    @transaction.atomic
    def handle(self, *args, **options):
        # ---------- Roles ----------
        roles = {}
        for nombre, desc in [
            ("Administrador", "Gestiona el sistema"),
            ("Cliente", "Realiza las reservas"),
        ]:
            roles[nombre], _ = Rol.objects.get_or_create(
                nombre_rol=nombre, defaults={"descripcion": desc}
            )

        # ---------- Usuarios ----------
        usuarios = {}
        for username, nombre, apellido, email, rol in [
            ("victor", "Victor", "Oviedo", "victor@gmail.com", "Administrador"),
            ("gadiel", "Gadiel", "Silva", "gadiel@gmail.com", "Cliente"),
            ("maribel", "Maribel", "Riesgo", "maribel@gmail.com", "Cliente"),
            ("agustin", "Agustin", "Tanno", "agustin@gmail.com", "Cliente"),
            ("fabricio", "Fabricio", "Cocconi", "fabricio@gmail.com", "Cliente"),
            ("marcos", "Marcos", "Reinoso", "marcos@gmail.com", "Cliente"),
        ]:
            user, creado = Usuario.objects.get_or_create(
                username=username,
                defaults={
                    "first_name": nombre,
                    "last_name": apellido,
                    "email": email,
                    "rol": roles[rol],
                },
            )
            if creado:
                user.set_password("prueba1234")
                user.save()
            usuarios[username] = user

        # ---------- Tipos de cancha ----------
        tipos = {}
        for nombre, jugadores, desc in [
            ("Futbol 8", 16, "Cancha chica de 8vs8"),
            ("Futbol 11", 22, "Cancha grande de 11vs11"),
        ]:
            tipos[nombre], _ = TipoCancha.objects.get_or_create(
                nombre=nombre,
                defaults={"cantidad_jugadores": jugadores, "descripcion": desc},
            )

        # ---------- Canchas ----------
        canchas = {}
        for i in range(1, 14):
            if i <= 10:
                tipo, superficie = "Futbol 11", "Cesped natural"
                desc = "Cancha de futbol 11 de cesped natural"
            elif i == 11:
                tipo, superficie = "Futbol 11", "Cesped sintetico"
                desc = "Cancha de futbol 11 de cesped sintetico"
            else:
                tipo, superficie = "Futbol 8", "Cesped sintetico"
                desc = "Cancha de futbol 8 de cesped sintetico"

            nombre = f"Cancha {i}"
            canchas[nombre], _ = Cancha.objects.get_or_create(
                nombre=nombre,
                defaults={
                    "tipo": tipos[tipo],
                    "superficie": superficie,
                    "descripcion": desc,
                    "estado": "disponible",
                },
            )

        # ---------- Reservas ----------
        for fecha, inicio, fin, estado, user, cancha in [
            (
                date(2026, 10, 9),
                time(22, 0),
                time(23, 0),
                "finalizada",
                "gadiel",
                "Cancha 1",
            ),
            (
                date(2026, 10, 16),
                time(22, 0),
                time(23, 0),
                "confirmada",
                "gadiel",
                "Cancha 1",
            ),
            (
                date(2026, 10, 23),
                time(22, 0),
                time(23, 0),
                "confirmada",
                "gadiel",
                "Cancha 1",
            ),
            (
                date(2026, 10, 9),
                time(22, 0),
                time(23, 0),
                "finalizada",
                "maribel",
                "Cancha 2",
            ),
            (
                date(2026, 10, 16),
                time(22, 0),
                time(23, 0),
                "pendiente",
                "maribel",
                "Cancha 5",
            ),
            (
                date(2026, 10, 9),
                time(19, 0),
                time(20, 30),
                "finalizada",
                "agustin",
                "Cancha 1",
            ),
        ]:
            if not Reserva.objects.filter(
                cancha=canchas[cancha], fecha=fecha, hora_inicio=inicio
            ).exists():
                Reserva.objects.create(
                    usuario=usuarios[user],
                    cancha=canchas[cancha],
                    fecha=fecha,
                    hora_inicio=inicio,
                    hora_fin=fin,
                    estado=estado,
                )

        # ---------- Desarrolladores ----------
        for nombre, linkedin, foto in [
            (
                "Fabricio Cocconi",
                "https://www.linkedin.com/in/fabricio-andr%C3%A9s-cocconi-huenz-9592ab356/",
                "Fabricio.jpg",
            ),
            (
                "Agustín Tanno",
                "https://www.linkedin.com/in/agustin-tanno-6513542a9/",
                "Agustin.jpg",
            ),
            (
                "Victor Oviedo",
                "https://www.linkedin.com/in/victor-a-oviedo/",
                "Victor.jpg",
            ),
            (
                "Maribel Riesgo",
                "https://www.linkedin.com/in/maribel-riesgo/",
                "Maribel.jpg",
            ),
            (
                "Marcos Reinoso",
                "https://www.linkedin.com/in/marcos-david-reinoso-cavoli-67a954375/",
                "Marcos.jpg",
            ),
            (
                "Gadiel Silva",
                "https://www.linkedin.com/in/gadiel-silva-monteabaro-4353a9273/",
                "Gadiel.jpg",
            ),
        ]:
            Desarrollador.objects.get_or_create(
                nombre=nombre,
                defaults={"rol": "Desarrollador", "linkedin": linkedin, "foto": foto},
            )

        self.stdout.write(self.style.SUCCESS("Datos de prueba cargados correctamente."))
