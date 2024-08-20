from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken

# all the providers that give us the authentication

AUTH_PROVIDERS={'email':'email', 'google':'google'}


class CustomUserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set");
    
        email=self.normalize_email(email);
        extra_fields.setdefault('is_active',True);
        user=self.model(email=email, last_name=last_name, first_name=first_name,**extra_fields);
        user.set_password(password);
        user.save(using=self._db);
        return user
    
    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True);
        extra_fields.setdefault('is_superuser',True);
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('superuser must have is_staff=True.');
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('super user must have is_superuser=True.')
        
        return self.create_user(email, first_name, last_name, password,**extra_fields)
    

class CustomUser(AbstractBaseUser, PermissionsMixin):
      
      email=models.EmailField(unique=True);
      first_name=models.CharField(max_length=100, verbose_name=_('First Name'), default='Unknown');
      last_name=models.CharField(max_length=100, verbose_name=_('Last Name'), default='Unknown');
      
      is_active=models.BooleanField(default=True);
      is_staff=models.BooleanField(default=False);

      is_pro=models.BooleanField(default=False); #for pro users

      auth_provider=models.CharField(max_length=50, default=AUTH_PROVIDERS.get('email'));
      
      objects=CustomUserManager()

      USERNAME_FIELD='email'
      REQUIRED_FIELDS=['first_name','last_name']


      def __str__(self):
          return self.email
      
      def get_full_name(self):
          return f'{self.first_name} {self.last_name}';
     
      def tokens(self):
          refresh=RefreshToken.for_user(self)

          return {
              'refresh':str(refresh),
              'access':str(refresh.access_token)
          }
      
      def save(self, *args, **kwargs):
          super().save(*args, **kwargs)
          if not self.groups.exists():
              customer_group, created= Group.objects.get_or_create(name='userCustomer')
              self.groups.add(customer_group);
   

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

    class Meta:
        ordering=['-created_at']

    def __str__(self):
        return self.title;
    
    