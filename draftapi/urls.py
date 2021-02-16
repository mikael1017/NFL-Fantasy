from django.urls import path
from .views import DraftPlayerView, PlayerDeleteView, AllDraftedPlayerView, TeamClearView

urlpatterns = [

    path('draft/<team>', DraftPlayerView, name="drafted-player"),
    path('<pk>/delete', PlayerDeleteView, name="delete-player"),
    path('draft', AllDraftedPlayerView, name="all-drafted-players"),
    path('clear/<team>', TeamClearView, name="clear-player")
]
