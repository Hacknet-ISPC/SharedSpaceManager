from django.shortcuts import render, get_object_or_404
from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Reserva

from .serializers import ReservaSerializer


class ReservaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            reservas = Reserva.objects.order_by("fecha", "hora_inicio")
            if not request.user.is_staff:
                reservas = reservas.filter(usuario=request.user)
            serializer = ReservaSerializer(reservas, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(
                {"error": "Error interno del servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def post(self, request):
        serializer = ReservaSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save(usuario=request.user)  # id_usuario sale de la sesión
            except Exception:
                return Response(
                    {"error": "Error interno del servidor"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservaCancelarView(APIView):
    """/reservas/<pk>/cancelar/  ->  PATCH (dueño o administrador)"""

    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        reserva = get_object_or_404(Reserva, pk=pk)

        es_admin = bool(
            request.user.rol and request.user.rol.nombre_rol == "Administrador"
        )
        if reserva.usuario != request.user and not es_admin:
            return Response(
                {"error": "No tienes permiso para cancelar esta reserva."},
                status=status.HTTP_403_FORBIDDEN,
            )

        if reserva.estado in (Reserva.Estado.CANCELADA, Reserva.Estado.FINALIZADA):
            return Response(
                {"error": f"No se puede cancelar una reserva {reserva.estado}."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reserva.estado = Reserva.Estado.CANCELADA
        try:
            reserva.save()
        except DjangoValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(
                {"error": "Error interno del servidor"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        return Response(ReservaSerializer(reserva).data, status=status.HTTP_200_OK)
