# take our models and translate into json
from rest_framework import serializers
from .models import *


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class DraftedPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = DraftedPlayer
        fields = '__all__'
