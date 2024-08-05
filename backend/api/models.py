from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings

class CustomUserManager(BaseUserManager):

    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set");
    
        email=self.normalize_email(email);
        user=self.model(email=email, username=username,**extra_fields);
        user.set_password(password);
        user.save(using=self._db);
        return user
    
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True);
        extra_fields.setdefault('is_superuser',True);
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('superuser must have is_staff=True.');
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('super user must have is_superuser=True.')
        
        return self.create_user(email, username, password,**extra_fields)
    

class CustomUser(AbstractBaseUser, PermissionsMixin):
      
      email=models.EmailField(unique=True);
      username=models.CharField(max_length=255, unique=True);
      is_active=models.BooleanField(default=True);
      is_staff=models.BooleanField(default=False);
      is_pro=models.BooleanField(default=False); #for pro users
      
      objects=CustomUserManager()

      USERNAME_FIELD='email'
      REQUIRED_FIELDS=['username']

      def __str__(self):
          return self.email
      

class Category(models.Model):

    name=models.CharField(max_length=255);
    
    def __str__(self):
        return self.name;


class Tag(models.Model):
      name=models.CharField(max_length=50, unique=True)

      def __str__(self):
          return self.name;



class Article(models.Model):
    title=models.CharField(max_length=255);
    content=models.TextField();
    author= models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE);
    is_pro=models.BooleanField(default=False);
    category=models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True);
    picture=models.ImageField(upload_to='article_pictures/',null=True, blank=True);
    tags=models.ManyToManyField(Tag, related_name='articles', blank=True);
    created_at=models.DateTimeField(auto_now_add=True);
    updated_at=models.DateTimeField(auto_now=True);

    def __str__(self):
        return self.title;
    
    