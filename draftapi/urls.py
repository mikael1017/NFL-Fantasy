from django.urls import path
from .views import *

urlpatterns = [

    path('draft', DraftPlayerView, name="drafted-player"),
    path('<pk>/delete', PlayerDeleteView, name="delete-player")
]
