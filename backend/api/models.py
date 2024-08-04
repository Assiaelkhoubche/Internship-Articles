from django.db import models
from django.contrib.auth.models import AbstractBaseUser



class CustomUser(AbstractBaseUser):
    is_pro=models.BooleanField(default=False) #additional fields for Pro users
 