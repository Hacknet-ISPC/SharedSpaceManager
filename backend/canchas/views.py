from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cancha
from .serializers import CanchaSerializer


class CanchaListView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        canchas = Cancha.objects.select_related("tipo").order_by("id")
        return Response(CanchaSerializer(canchas, many=True).data)


class CanchaDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        cancha = get_object_or_404(Cancha, pk=pk)
        return Response(CanchaSerializer(cancha).data)
