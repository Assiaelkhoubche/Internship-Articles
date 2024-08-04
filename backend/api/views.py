from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser
from .serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class CreateUserView(generics.CreateAPIView):
    serializer_class=UserSerializer;
    permission_classes=[AllowAny];
    def get_queryset(self):
        return CustomUser.objects.all()

