from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from .models import CustomUser, Category, Article, Tag

from djoser.serializers import UserCreateSerializer 
from .utils import Google, register_social_user
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user);
        
        token['email']=user.email;
        token['first_name']=user.first_name;
        token['last_name']=user.last_name;
        
        token['groups']=[group.name for group in user.groups.all()]
        
        return token;
      

class GoogleSignInSerializer(serializers.Serializer):

    access_token=serializers.CharField(min_length=6);
    
    
    def validate_access_token(self, access_token):
        user_data=Google.validate(access_token)
        print( user_data)
        try:
            user_data['sub']
            print('sub ', user_data['sub'])
            
        except:
            raise serializers.ValidationError("this token has expired or invalid please try again")
        
        if user_data['aud'] != settings.GOOGLE_CLIENT_ID:
                raise AuthenticationFailed('Could not verify user.')

        user_id=user_data['sub']
        email=user_data['email']
        first_name=user_data['given_name']
        last_name=user_data['family_name']
        provider='google'

        return register_social_user(provider, email, first_name, last_name)





class CustomUserSerializer(UserCreateSerializer):

    groups=serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'

    )
   
    class Meta(UserCreateSerializer.Meta):
        model=CustomUser
        fields=['id','first_name','last_name','password','email', 'is_pro','is_active','groups']
        extra_kwargs={'password':{'write_only':True}, 'is_active':{'read_only':True}}
    

# class UserSerializer(ModelSerializer):
#     class Meta:
#         model=CustomUser
#         fields=['id','username','password','email', 'is_pro']
#         extra_kwargs={'password':{'write_only':True}}
    
#     def create(self,validate_data):
#         user=CustomUser.objects.create_user(**validate_data)
#         return user


class CategorySerializer(ModelSerializer):
    class Meta:
        model=Category;
        fields=['id','name'];


class TagSerializer(ModelSerializer):
    class Meta:
        model=Tag
        fields=['id','name']


class ArticleSerializer(ModelSerializer):

    category=CategorySerializer(read_only=True)
    category_id=serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    
    tags=TagSerializer(many=True, read_only=True);
 
    author=CustomUserSerializer();
    class Meta:
        model=Article
        fields=['id', 'title','content','author','picture','is_pro','category', 'category_id','tags','created_at','updated_at']
        extra_kwargs={'author':{'read_only':True}}