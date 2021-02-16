from django.urls import path
from .views import *

urlpatterns = [
    path('', HomeView, name="api-overview"),
    path('player/', PlayerView, name="playerlist"),
    path('player/name/<str:name>/', PlayerFilterNameView,
         name="player-filter-name"),
    path('player/pos/<str:position>/', PlayerFilterPosView,
         name="player-filter-position/"),
]
