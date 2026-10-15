from django.urls import path
from .views import DesarrolladorView

urlpatterns = [
    path("desarrolladores/", DesarrolladorView.as_view(), name="desarrolladores"),
]