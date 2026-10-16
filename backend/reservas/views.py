from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.reservas.models import Reserva

from .serializers import ReservaSerializer


class ReservaCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

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

    def delete(self, request):
        reserva_id = request.data.get("id")
        if not reserva_id:
            return Response(
                {"error": "Se requiere el ID de la reserva para eliminarla"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            reserva = Reserva.objects.get(id=reserva_id, usuario=request.user)
            reserva.delete()
            return Response(
                {"mensaje": "Reserva eliminada exitosamente"},
                status=status.HTTP_200_OK,
            )
        except Reserva.DoesNotExist:
            return Response(
                {"error": "No se encontró la reserva o no pertenece al usuario"},
                status=status.HTTP_404_NOT_FOUND,
            )
