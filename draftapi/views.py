from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PlayerSerializer, DraftedPlayerSerializer
from .models import Player, DraftedPlayer
from django.http import JsonResponse
from rest_framework import status
import json
from django.http import HttpResponse

# Create your views here.


@api_view(['GET'])
def AllDraftedPlayerView(request):
    drafted_players = DraftedPlayer.objects.all()
    serializer = DraftedPlayerSerializer(drafted_players, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
def DraftPlayerView(request, team):
    drafted_players = DraftedPlayer.objects.filter(pickedTeam__icontains=team)
    if request.method == 'GET':
        serializer = DraftedPlayerSerializer(drafted_players, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        # player = post_json['player_data']
        serializer = DraftedPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(pickedTeam=team)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def PlayerDeleteView(request, pk):
    try:
        player = DraftedPlayer.objects.get(id=pk)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    operation = player.delete()
    if operation:
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def TeamClearView(request, team):
    try:
        player = DraftedPlayer.objects.filter(pickedTeam=team)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    operation = player.delete()
    if operation:
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
