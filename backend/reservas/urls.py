from django.urls import path
from .views import ReservaView, ReservaCancelarView

urlpatterns = [
    path("reservas/", ReservaView.as_view(), name="reserva"),
    path("reservas/<int:pk>/cancelar/", ReservaCancelarView.as_view())
]
