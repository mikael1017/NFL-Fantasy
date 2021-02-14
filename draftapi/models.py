from django.db import models
from ..api.models import Player
# Create your models here.


class DraftedPlayer(Player):
    pickedTeam = models.IntegerField(null=True)
