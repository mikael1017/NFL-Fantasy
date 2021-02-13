from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=30)
    position = models.CharField(max_length=2, null=True)
    age = models.IntegerField(null=True)
    posRank = models.IntegerField(null=True)
    team = models.CharField(max_length=5)

    throwAtt = models.IntegerField(null=True)
    throwYd = models.IntegerField(null=True)
    throwTD = models.IntegerField(null=True)
    interception = models.IntegerField(null=True)

    rushAtt = models.IntegerField(null=True)
    rushYd = models.IntegerField(null=True)
    rushTD = models.IntegerField(null=True)
    rushAvgYd = models.FloatField(null=True)

    target = models.IntegerField(null=True)
    rec = models.IntegerField(null=True)
    recYd = models.IntegerField(null=True)
    recAvgYd = models.FloatField(null=True)
    recTD = models.IntegerField(null=True)
    totalTD = models.IntegerField(null=True)

    fumble = models.IntegerField(null=True)
    fpts = models.FloatField(null=True)
    ppr = models.FloatField(null=True)
    totGames = models.IntegerField(null=True)


class DraftedPlayer(Player):
    pickedTeam = models.IntegerField(null=True)
