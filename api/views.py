from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PlayerSerializer, DraftedPlayerSerializer
from .models import Player, DraftedPlayer
from django.http import JsonResponse
from rest_framework import status

serializer_class = PlayerSerializer


@api_view(['GET'])
def HomeView(request):
    api_urls = {
        'Players': '/player',
        'Player Filter with name': '/player/name/<str:name>',
        'Personal List': '/personal-list',
        'Mock Draft result': '/draft',
    }
    return Response(api_urls, status=status.HTTP_200_OK)


@api_view(['GET'])
def PlayerView(request):
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def PlayerFilterNameView(request, name):
    players = Player.objects.filter(name__icontains=name)
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def PlayerFilterPosView(request, position):
    players = Player.objects.filter(position__icontains=position)
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
