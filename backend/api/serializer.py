from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CustomUser, Category, Article, Tag



class UserSerializer(ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['id','username','password','email', 'is_pro']
        extra_kwargs={'password':{'write_only':True}}
    
    def create(self,validate_data):
        user=CustomUser.objects.create_user(**validate_data)
        return user


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
    tags=TagSerializer(read_only=True);
    tags_ids=serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), many=True, source='tags', write_only=True
    );
    class Meta:
        models=Article
        fields=['id', 'title','content','author','is_pro','category', 'category_id','tags','tag_ids','created_at','updated_at']