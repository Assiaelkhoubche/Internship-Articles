from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser, Article, Tag, Category
from .serializer import UserSerializer, ArticleSerializer, TagSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsUserCustomer ,IsUserManager, IsUserManagerWithModelPermission


class CreateUserView(generics.CreateAPIView):
    serializer_class=UserSerializer;
    permission_classes=[AllowAny];
    def get_queryset(self):
        return CustomUser.objects.all()
    

class UserListView(generics.ListAPIView):
    serializer_class=UserSerializer;
    permission_classes=[IsUserManagerWithModelPermission];

    def get_queryset(self):
        return CustomUser.objects.all()
    

class ArticleListView(generics.ListAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[AllowAny];
    
    def get_queryset(self):
        return Article.objects.all()


class ArticleRetreiveView(generics.RetrieveAPIView):
      serializer_class=ArticleSerializer;
      permission_classes=[IsUserCustomer | IsUserCustomer];
      queryset= Article.objects.all();


class ArticleCreateView(generics.CreateAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Article.objects.all();
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(athor=self.request.user);
        else:
            print(serializer.errors)


class ArticleUpdateView(generics.UpdateAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Article.objects.all();


class ArticleDeleteView(generics.DestroyAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Article.objects.all();



class CreateListCategory(generics.ListCreateAPIView):
    serializer_class=CategorySerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Category.objects.all();



class CreateListTage(generics.ListCreateAPIView):
    serializer_class=TagSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Tag.objects.all();


