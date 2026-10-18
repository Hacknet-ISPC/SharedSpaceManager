from django.urls import path
from .views import CanchaListView, CanchaDetailView

urlpatterns = [
    path("canchas/", CanchaListView.as_view(), name="canchas"),
    path("canchas/<int:pk>/", CanchaDetailView.as_view()),
]
