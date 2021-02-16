from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PlayerSerializer, DraftedPlayerSerializer
from .models import Player, DraftedPlayer
from django.http import JsonResponse
from rest_framework import status

# Create your views here.


@api_view(['GET', 'POST'])
def DraftPlayerView(request):
    drafted_player = Player.objects.all()
    if request.method == 'GET':
        serializer = DraftedPlayerSerializer(drafted_player, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = DraftedPlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def DraftTeamView(request):


@api_view(['DELETE'])
def PlayerDeleteView(request, pk):
    try:
        player = Player.objects.get(id=pk)
    except Player.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    operation = player.delete()
    if operation:
        return Response({'Message': 'Success'}, status=status.HTTP_200_OK)
    return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
