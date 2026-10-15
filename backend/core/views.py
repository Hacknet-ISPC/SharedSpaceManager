from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import Desarrollador
from .serializers import DesarrolladorSerializer


class DesarrolladorView(APIView):
    permission_classes = [AllowAny]  # la página "Quiénes somos" es pública

    def get(self, request):
        desarrolladores = Desarrollador.objects.all()
        serializer = DesarrolladorSerializer(desarrolladores, many=True)
        return Response(serializer.data)
