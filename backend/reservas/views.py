from django.shortcuts import render

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

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