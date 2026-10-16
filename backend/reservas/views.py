from django.shortcuts import render, get_object_or_404

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Reserva

from .serializers import ReservaSerializer


class ReservaView(APIView):
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

    def delete(self, request, pk=None):
        """Elimina una reserva específica por su ID, asegurando que pertenezca al usuario autenticado."""
        # Busca la reserva o devuelve un 404 si no existe
        reserva = get_object_or_404(Reserva, pk=pk)

        # Opcional: Validar que el usuario sea el dueño de la reserva (si no es admin)
        if reserva.usuario != request.user and not request.user.is_staff:
            return Response(
                {"error": "No tienes permiso para eliminar esta reserva."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            reserva.delete()
        except Exception:
            return Response(
                {"error": "Error interno del servidor al eliminar"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Reserva eliminada con éxito"},
            status=status.HTTP_204_NO_CONTENT,
        )