from django.urls import path
from .views import ReservaCreateView

urlpatterns = [
    path("reservas/", ReservaCreateView.as_view(),name="reserva"),
]
