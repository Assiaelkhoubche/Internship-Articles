from django.shortcuts import render
from rest_framework import generics, status
from .models import CustomUser, Article, Tag, Category
from .serializer import CustomUserSerializer, ArticleSerializer, TagSerializer, CategorySerializer, GoogleSignInSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import IsUserCustomer ,IsUserManager, IsUserManagerWithModelPermission
from rest_framework.response import Response



class GoogleSignInView(generics.GenericAPIView):
    serializer_class=GoogleSignInSerializer
    permission_classes=[AllowAny]
    def post(self, request):
        print('Received request data:', request.data)
        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  # Log serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        print('Valid serializer data:', serializer.validated_data)
        data = serializer.validated_data['access_token']
        return Response(data, status=status.HTTP_200_OK)


class CreateUserView(generics.CreateAPIView):
    serializer_class=CustomUserSerializer;
    permission_classes=[AllowAny];
    def get_queryset(self):
        return CustomUser.objects.all()
    

class UserListView(generics.ListAPIView):
    serializer_class=CustomUserSerializer;
    permission_classes=[AllowAny];
    def get_queryset(self):
        print('all users donn')
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

class CategoryList(generics.ListAPIView):
    serializer_class=CategorySerializer;
    permission_classes=[IsAuthenticated];
    
    def get_queryset(self):
        return Category.objects.all()


class CreateListTage(generics.ListCreateAPIView):
    serializer_class=TagSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Tag.objects.all();



 