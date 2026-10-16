from django.urls import path
from .views import ReservaView

urlpatterns = [
    path("reservas/", ReservaView.as_view(), name="reserva"),
]
