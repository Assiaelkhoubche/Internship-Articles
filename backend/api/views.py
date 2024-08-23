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
        queryset=Article.objects.all();

        category_id=self.request.query_params.get('category');
        print('category_id',category_id);
        if category_id:
            queryset =queryset.filter(category__id=category_id)

        
        tag_name= self.request.query_params.get('tag');

        if tag_name:

            queryset=queryset.filter(tags__name=tag_name);
            
        return queryset;


class ArticleRetreiveView(generics.RetrieveAPIView):
      serializer_class=ArticleSerializer;
      permission_classes=[IsUserCustomer | IsUserCustomer];
      queryset= Article.objects.all();


class ArticleCreateView(generics.CreateAPIView):
    
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManager];
    
    def get_queryset(self):
        return Article.objects.all();
    
    def post(self, request, *args, **kwargs):
        print('request method', request.method);
        return super().post(request, *args, **kwargs)
    
    def perform_create(self , serializer):
        
        new_category_name=self.request.data.get('category',None);
        category=None
        new_tags_name=self.request.data.getlist('tags[]');
        tags=[]


        if new_category_name:
            category , created=Category.objects.get_or_create(name=new_category_name);
            print('category');
        for tag_name in new_tags_name:
            tag, created=Tag.objects.get_or_create(name=tag_name);
            tags.append(tag);
        
        
        article=serializer.save(author=self.request.user, category=category);
        article.tags.set(tags);

        # if category:
        #     article.category=category;
        
        article.save();


class ArticleUpdateView(generics.UpdateAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManagerWithModelPermission];
    
    def get_queryset(self):
        return Article.objects.all();

    def put(self, request, *args, **kwargs):
        print('put Method: ', request.method);
        return super().put(request, *args, **kwargs);
    
    def perform_update(self, serializer):
        
        new_tags_name=self.request.data.getlist('tags[]');
        tags=[];
        new_category_name=self.request.data.get('category',None);
        category=None;
        
        if new_category_name:
            category, created=Category.objects.get_or_create(name=new_category_name);
        
        for tag_name in new_tags_name:
            tag, created=Tag.objects.get_or_create(name=tag_name);
            tags.append(tag);
        
        article=serializer.save(author=self.request.user, category=category);
        article.tags.set(tags);
        article.save();



class ArticleDeleteView(generics.DestroyAPIView):
    serializer_class=ArticleSerializer;
    permission_classes=[IsUserManager];
    
    def get_queryset(self):
        return Article.objects.all();




class CategoryList(generics.ListAPIView):
    serializer_class=CategorySerializer;
    permission_classes=[IsUserCustomer | IsUserManager];
    
    def get_queryset(self):
        return Category.objects.all();
   
    def get(self, request ,*args , **kwargs):
        #debugging output

        print(f"User: {request.user}");
        print(f'User Groups:{request.user.groups.all()}');
        return super().get(request,*args, **kwargs);


class CreateListTage(generics.ListCreateAPIView):
    serializer_class=TagSerializer;
    permission_classes=[IsUserCustomer | IsUserManager];
    
    def get_queryset(self):
        return Tag.objects.all();


# class TagList(generics.ListAPIView):
#     serializer_class=TagSerializer;
#     permission_classes=[AllowAny ]; 
#     queryset=Tag.objects.all();



 